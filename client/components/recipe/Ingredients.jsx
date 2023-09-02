"use client"

import { useState } from "react"
import AddIngredients from '@components/recipe/AddIngredients'
import IngredientsList from '@components/recipe/IngredientsList'

const Ingredients = ({ recipe, setRecipe }) => {
    const [ingError, setIngError] = useState(false)

    function onAdd(newIngredient) {
        console.log(recipe.ingredients)
        if (!newIngredient.ingredient || !newIngredient.qty || newIngredient.qty === '0') {
            setIngError('Please ensure all ingredient fields are properly filled!')
            console.log('Please ensure all ingredient fields are properly filled!')
            return false
        }
        if (recipe.ingredients.length > 0 && recipe.ingredients.find(x => x.ingredient.name === newIngredient.ingredient.name)) {
            setIngError('You have already added this ingredient!')
            console.log('You have already added this ingredient!')
            return false
        }
        if (recipe.ingredients[0] === '' || recipe.ingredients.length === 0) {
            setIngError(false)
            setRecipe({ ...recipe, ingredients: [newIngredient] })
            return true
        } else {
            setIngError(false)
            setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngredient] })
            return true
        }
    }


    return (
        <div className="flex flex-col gap-5">
            <IngredientsList recipe={recipe} setRecipe={setRecipe} />
            {ingError && (<div className="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{ingError}</span>
            </div>)}
            <AddIngredients onAdd={onAdd} recipe={recipe} setRecipe={setRecipe} />
        </div>
    )
}

export default Ingredients