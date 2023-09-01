"use client"

import RecipeCard from '@components/recipe/RecipeCard'
import Spinner from '@components/ui/Spinner'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuthContext } from '@contexts/AuthContext'

const Home = () => {
    const auth = useAuthContext()
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/viewposts`)
            const recipesJSON = await recipesData.json()
            setRecipes(recipesJSON)
        }
        fetchRecipes()
        console.log(auth)
    }, [])

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

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