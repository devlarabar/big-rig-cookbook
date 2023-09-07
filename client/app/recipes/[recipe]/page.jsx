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
            const recipeData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/recipe/edit/${id}`)
            const recipeJSON = await recipeData.json()
            setRecipe(recipeJSON ? recipeJSON : 404)
        }
        fetchRecipe()
    }, [id])

    async function deleteRecipe() {
        const confirm = window.confirm('Are you sure you want to delete this recipe? This action is permanent!')
        if (confirm) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/recipe/delete/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
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
        <section className="rounded-xl bg-slate-100 dark:bg-base-100 w-full md:w-[668px] p-5 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-2 flex-between">
                <h2 className="big-heading">{recipe.title}</h2>
                {auth.user.id === recipe.author._id && (
                    <div className="flex flex-center gap-5">
                        <Link href={`/recipes/edit/${recipe._id}`} className="btn btn-primary">
                            Edit
                        </Link>
                        <button className="btn btn-outline" onClick={deleteRecipe}>Delete</button>
                    </div>
                )}
            </div>
            <section className="flex flex-between">
                <p>
                    <Link href={`/user/${recipe.author.username}`}>{recipe.author.username}</Link> | <time>{format(new Date(recipe.createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
            </section>

            <hr className="divider" />

            <h3>Time</h3>
            <p className="flex gap-5">
                <span>Preparation time: {recipe.prepTime} min ({(recipe.prepTime / 60).toFixed(1)} hr)</span> |
                <span>Cook time: {recipe.cookTime} min ({(recipe.prepTime / 60).toFixed(1)} hr)</span>
            </p>

            <h3>Ingredients</h3>
            <ul className="list-disc pl-5">
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
            <ul className="list-disc pl-5">
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
            <ol className="list-decimal pl-5">
                {recipe.directions && recipe.directions.length > 0 ? recipe.directions.map((x, i) => {
                    return (
                        <li key={`${i}-${x[0]}`}>
                            {x}
                        </li>
                    )
                }) : 'No directions specified.'
                }
            </ol>
        </section>
    )
}

export default RecipeDetails