export interface MealModel {
    id?: string;
    title: string;
    summary: string;
    slug?: string;
    image: string;
    creator: string;
    creator_email?: string;
    instructions: string;
}