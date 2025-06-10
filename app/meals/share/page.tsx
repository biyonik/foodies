'use client';

import classes from './page.module.css';
import ImagePicker from "@/components/meals/image-picker/image-picker";
import shareMeal from "@/lib/actions/create-meal-action";
import MealsFormSubmit from "@/components/meals/form-submit/meals-form-submit";
import {useActionState} from "react";

export default function ShareMealPage() {
    const [state, action, isPending] = useActionState(shareMeal, null);

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={action}>
                    {state?.message && (
                        <div className={state.success ? classes.success : classes.error}>
                            {state.message}
                        </div>
                    )}

                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required/>
                            {state?.errors?.name && (
                                <span className={classes.error}>{state.errors.name}</span>
                            )}
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required/>
                            {state?.errors?.email && (
                                <span className={classes.error}>{state.errors.email}</span>
                            )}
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required/>
                        {state?.errors?.title && (
                            <span className={classes.error}>{state.errors.title}</span>
                        )}
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required/>
                        {state?.errors?.summary && (
                            <span className={classes.error}>{state.errors.summary}</span>
                        )}
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows={10}
                            required
                        ></textarea>
                        {state?.errors?.instructions && (
                            <span className={classes.error}>{state.errors.instructions}</span>
                        )}
                    </p>
                    <ImagePicker label={"Image"} name={"image"}/>
                    {state?.errors?.image && (
                        <span className={classes.error}>{state.errors.image}</span>
                    )}
                    <p className={classes.actions}>
                        <MealsFormSubmit/>
                    </p>
                </form>
            </main>
        </>
    );
}