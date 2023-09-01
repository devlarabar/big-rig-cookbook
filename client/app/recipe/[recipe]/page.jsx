"use client"

import { useParams, redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import Spinner from '@components/ui/Spinner'
import Link from 'next/link'
import { format } from 'date-fns'
import { useAuthContext } from '@contexts/AuthContext'

const RecipeDetails = () => {
    const auth = useAuthContext()
    const { recipe: id } = useParams()
    const [recipe, setRecipe] = useState('')
    const [doRedirect, setDoRedirect] = useState(false)

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/edit/${id}`)
            const recipeJSON = await recipeData.json()
            setRecipe(recipeJSON ? recipeJSON : 404)
        }
        fetchRecipe()
    }, [id])

    async function deleteRecipe() {
        const confirm = window.confirm('Are you sure you want to delete this recipe? This action is permanent!')
        if (confirm) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/delete/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (response.ok) {
                setDoRedirect(true)
            }
        } else {
            return
        }
    }

    if (doRedirect) {
        return redirect('/home')
    }

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')
    if (!recipe) return <Spinner />
    if (recipe === '404') return <p>Recipe not found.</p>

    return (
        <div className="recipe-details">
            <h2 className="big-heading flex flex-col sm:flex-row gap-1 flex-between">
                <span>{recipe.title}</span>
                {auth.user.id === recipe.author._id && (
                    <div className="flex flex-center gap-5">
                        <Link href={`/recipe/edit/${recipe._id}`} className="btn btn-primary">
                            Edit
                        </Link>
                        <button className="btn btn-outline" onClick={deleteRecipe}>Delete</button>
                    </div>
                )}</h2>
            <div className="post-info flex flex-between">
                <p>
                    <Link href={`/user/${recipe.author.username}`} className="post-author">{recipe.author.username}</Link> | <time>{format(new Date(recipe.createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>

            </div>
            <h3>Time</h3>
            <p>Preparation time: {recipe.prepTime} | Cook time: {recipe.cookTime}</p>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients.map((x, i) => {
                    return (
                        <li key={`${i}-${x.ingredient.name}`}>
                            {x.ingredient.name} - {x.qty} {x.measurement}
                        </li>
                    )
                }) : 'No ingredients specified.'
                }
            </ul>
            <h3>Cookware</h3>
            <ul>
                {recipe.cookware && recipe.cookware.length > 0 ? recipe.cookware.map((x, i) => {
                    return (
                        <li key={`${i}-${x}`}>
                            {x}
                        </li>
                    )
                }) : 'No cookware specified.'
                }
            </ul>
            <h3>Directions</h3>
            <ol>
                {recipe.directions && recipe.directions.length > 0 ? recipe.directions.map((x, i) => {
                    return (
                        <li key={`${i}-${x[0]}`}>
                            {x}
                        </li>
                    )
                }) : 'No directions specified.'
                }
            </ol>
        </div>
    )
}

export default RecipeDetails