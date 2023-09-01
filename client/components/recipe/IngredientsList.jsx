"use client"

const IngredientsList = ({ recipe }) => {
    return (
        <div>
            {recipe.ingredients.length > 0 && recipe.ingredients.map((ingredient, index) => {
                return (
                    <div className="alert" key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{ingredient.ingredient.name} - {ingredient.qty} {ingredient.measure}</span>
                        <div>
                            <button type="button" className="btn btn-sm btn-primary">Remove</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default IngredientsList