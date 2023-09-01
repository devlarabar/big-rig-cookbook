"use client"

import { useState, useEffect } from 'react'
import Ingredients from './Ingredients'
import Cookware from './Cookware'
import Directions from './Directions'
import { useAuthContext } from '@contexts/AuthContext'

const CreateRecipeForm = ({ recipeData, setDoRedirect }) => {
    const auth = useAuthContext()
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        cookware: [''],
        directions: [''],
        prepTime: '',
        cookTime: ''
    })

    useEffect(() => {
        console.log(recipeData)
        if (recipeData && recipeData.title !== '') {
            setRecipe(recipeData)
        }
    }, [])

    const submitDisabled = !(recipe.title !== ''
        && recipe.ingredients.length >= 1
        && recipe.cookware[0] !== ''
        && recipe.directions[0] !== ''
        && recipe.prepTime >= 1
        && recipe.cookTime >= 1
        && auth?.user.id)

    async function createRecipe(e) {
        e.preventDefault()
        if (recipe.ingredients.length === 0) {
            alert('Please enter at least one ingredient!')
        } else {
            if (auth?.user) {
                console.log(auth?.user)
                const recipeInfo = {
                    user: auth?.user,
                    ...recipe
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/create`, {
                    method: 'POST',
                    body: JSON.stringify(recipeInfo),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok) {
                    setDoRedirect(true)
                }
            } else {
                console.log('You are not signed in!')
            }
        }
    }

    return (
        <form onSubmit={createRecipe} className="w-full flex flex-col gap-5 p-5 mb-5">
            <h2 className="big-heading">Create Recipe</h2>
            <label htmlFor="title">Title
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    required
                    value={recipe.title}
                    onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                    className="input input-bordered w-full"
                />
            </label>
            <div className="flex flex-between gap-5">
                <div><label htmlFor="preptime">Prep Time</label>
                    <input
                        type="number"
                        id="preptime"
                        placeholder="20"
                        min={1}
                        required
                        value={recipe.preptime}
                        onChange={(e) => setRecipe({ ...recipe, prepTime: e.target.value })}
                        className="input input-bordered w-full"
                    />
                </div>
                <div><label htmlFor="cooktime">Cook Time</label>
                    <input
                        type="number"
                        id="cooktime"
                        placeholder="20"
                        min={1}
                        required
                        value={recipe.cooktime}
                        onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <Ingredients recipe={recipe} setRecipe={setRecipe} />
            <Cookware recipe={recipe} setRecipe={setRecipe} />
            <Directions recipe={recipe} setRecipe={setRecipe} />

            {submitDisabled && <p className="text-xs mt-0">Please ensure all the required fields are filled.</p>}
            <button type="submit" className="btn btn-primary disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white" disabled={submitDisabled}>Create Recipe</button>
        </form>
    )
}

export default CreateRecipeForm