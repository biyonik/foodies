import { z } from 'zod';

export const mealSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
    email: z.string().email('Invalid email address'),
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    summary: z.string().min(10, 'Summary must be at least 10 characters').max(200, 'Summary too long'),
    instructions: z.string().min(20, 'Instructions must be at least 20 characters'),
    image: z.instanceof(File).refine(
        (file) => file.size > 0,
        'Image is required'
    ).refine(
        (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
        'Only JPEG and PNG images are allowed'
    ).refine(
        (file) => file.size <= 5 * 1024 * 1024, // 5MB
        'Image size must be less than 5MB'
    )
});

export type MealFormData = z.infer<typeof mealSchema>;