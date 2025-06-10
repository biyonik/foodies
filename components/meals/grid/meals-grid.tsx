import classes from './meals-grid.module.css';
import {MealModel} from "@/models/meal-model.interface";
import MealItem from "@/components/meals/item/meal-item";

interface MealsGridProps {
    meals: MealModel[]
}

export default function MealsGrid({meals}: MealsGridProps) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal =>
                <li key={meal.id}>
                    <MealItem {...meal}/>
                </li>
            )}
        </ul>
    )
}