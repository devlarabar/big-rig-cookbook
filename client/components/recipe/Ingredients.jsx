"use client"

import { useState } from "react"
import AddIngredients from '@components/recipe/AddIngredients'
import IngredientsList from '@components/recipe/IngredientsList'

const Ingredients = ({ recipe, setRecipe }) => {
    const [ingError, setIngError] = useState(false)

    function onAdd(newIngredient) {
        setIngError(false)
        if (!newIngredient.ingredient || !newIngredient.qty || newIngredient.qty === '0') {
            setIngError('qty')
            console.log('Please ensure all ingredient fields are properly filled!')
            return false
        }
        if (recipe.ingredients.find(x => x.ingredient.name === newIngredient.ingredient.name)) {
            setIngError('duplicate')
            console.log('You have already added this ingredient!')
            return false
        }
        if (recipe.ingredients[0] === '') {
            setIngError(false)
            setRecipe({...recipe, ingredients: [newIngredient]}) 
            return true
        } else {
            setIngError(false)
            setRecipe({...recipe, ingredients: [...recipe.ingredients, newIngredient]}) 
            return true
        }
    }

    
  return (
    <div className="flex flex-col gap-5">
        <IngredientsList recipe={recipe} setRecipe={setRecipe} />
        {ingError && <p>{ingError}</p>}
        <AddIngredients onAdd={onAdd} recipe={recipe} setRecipe={setRecipe}  />
    </div>
  )
}

export default Ingredients