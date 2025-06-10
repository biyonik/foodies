import Link from "next/link";

import classes from './page.module.css';
import MealsGrid from "@/components/meals/grid/meals-grid";
import {getMeals} from "@/lib/meals";
import {MealModel} from "@/models/meal-model.interface";
import {Suspense} from "react";

async function Meals() {
    const meals: MealModel[] = await getMeals() as MealModel[];

    return  <MealsGrid meals={meals}/>
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy fun!
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}