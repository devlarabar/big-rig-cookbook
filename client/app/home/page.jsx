"use client"

import RecipeCard from '@components/recipe/RecipeCard'
import Spinner from '@components/ui/Spinner'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuthContext } from '@contexts/AuthContext'
import Link from 'next/link'

const Home = () => {
    const auth = useAuthContext()
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesData = await fetch(`/server/recipe/viewrecipes`)
            const recipesJSON = await recipesData.json()
            setRecipes(recipesJSON)
        }
        fetchRecipes()
    }, [])

    if (!auth?.checkAuth) return <Spinner />
    if (auth?.isAuthenticated() === "unauthenticated" || auth?.user === null) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center">
                <p>You must be signed in to view this page.</p>
                <Link href="/account/login" className="mx-auto mt-6">
                    <button
                        type="button"
                        className="btn btn-primary w-48"
                    >
                        Sign In
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div className="recipe-feed">
            {recipes && recipes.map((recipe, index) => {
                return (
                    <RecipeCard user={auth.user} recipe={recipe} key={index} />
                )
            })}
        </div>
    )
}

export default Home