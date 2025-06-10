"use server";

import classes from './page.module.css';
import Image from "next/image";
import {MealModel} from "@/models/meal-model.interface";
import {getMeal} from "@/lib/meals";
import {notFound} from "next/navigation";

interface DynamicMealPageSlug {
    params: Promise<{
        mealSlug: string;
    }>
}

export default async function DynamicMealPage({params}: DynamicMealPageSlug) {
    const {mealSlug} = await params;
    const meal: MealModel = await getMeal(mealSlug) as MealModel;

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br>')

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}></p>
            </main>
        </>
    )
}