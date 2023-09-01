"use client"

const IngredientsList = ({ recipe }) => {
    return (
        <div>
            {recipe.ingredients.length > 0 && recipe.ingredients.map((ingredient, index) => {
                return (
                    <div key={index}>
                        {ingredient.ingredient.name} - {ingredient.qty} {ingredient.measure}
                    </div>
                )
            })}
        </div>
    )
}

export default IngredientsList