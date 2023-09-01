"use client"

const IngredientsList = ({ recipe }) => {
    return (
        <ul>
            {recipe.ingredients.length > 0 && recipe.ingredients.map((ingredient, index) => {
                return (
                    <li className="alert bg-base-100 flex flex-row justify-between" key={index}>
                        <p className="flex flex-row gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{ingredient.ingredient.name} - {ingredient.qty} {ingredient.measure}</span>
                        </p>
                        <div>
                            <button type="button" className="btn btn-sm btn-outline">Remove</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default IngredientsList