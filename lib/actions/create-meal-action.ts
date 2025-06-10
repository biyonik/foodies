'use server';

import slugify from "slugify";
import xss from "xss";
import * as fs from "node:fs";
import {addMeal} from "@/lib/meals";
import {FormState} from "@/lib/interfaces/form-state.interface";
import {mealSchema} from "@/lib/validations/meal-validation";
import {ZodIssue} from "zod";
import {revalidatePath} from "next/cache";

export default async function shareMeal(prevState: FormState | null, formData: FormData): Promise<FormState> {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image')
    };

    const result = mealSchema.safeParse(rawData);

    if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((error: ZodIssue): void => {
            errors[error.path[0]] = error.message;
        });

        return { errors };
    }

    try {
        const { name, email, title, summary, instructions, image } = result.data;

        const slug:string = slugify(title, {lower: true});
        const cleanInstructions: string = xss(instructions);

        const extension:string|undefined = image.name.split('.').pop();
        const fileName = `${slug}.${extension}`;
        const filePath = `public/images/${fileName}`;

        const bufferedImage:ArrayBuffer = await image.arrayBuffer();
        await fs.promises.writeFile(filePath, Buffer.from(bufferedImage));

        const meal = {
            title,
            creator: name,
            creator_email: email,
            instructions: cleanInstructions,
            summary,
            image: `/images/${fileName}`,
            slug
        };

        await addMeal(meal);
        revalidatePath('/meals');

        return {
            success: true,
            message: 'Meal shared successfully!'
        };

    } catch (error) {
        return {
            message: 'Failed to share meal. Please try again.'
        };
    }
}