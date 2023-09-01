"use client"

import CreateRecipeForm from '@components/recipe/CreateRecipeForm'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuthContext } from '@contexts/AuthContext'
import Link from 'next/link'
import Spinner from '@components/ui/Spinner'

const CreateRecipe = () => {
    const auth = useAuthContext()
    const [doRedirect, setDoRedirect] = useState(false)
    const [recipeData, setRecipeData] = useState('')
    const { recipe } = useParams()

    useEffect (() => {
        const getRecipeData = async () => {
            const recipeFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/edit/${recipe}`)
            const recipeJSON = await recipeFetch.json()
            setRecipeData(recipeJSON)
        }
        getRecipeData()
    }, [recipe])

    useEffect(() => console.log(recipeData), [recipeData])

    useEffect(() => {
        if (doRedirect) redirect('/home')
    }, [doRedirect])
    
    if (recipeData === null) return <p>Recipe not found.</p>
    if (!auth?.user || recipeData === '') return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <main className="w-full max-w-screen-sm flex flex-center">
            {auth.user.id !== recipeData.author._id 
                ? 
                <section className="flex flex-center flex-col gap-5">
                    <p>You are not the author of this recipe!</p>
                    <Link href={'/home'}><button className="btn">Home</button></Link>
                </section> 
                : <CreateRecipeForm recipeData={recipeData} setDoRedirect={setDoRedirect}/>
            }
        </main>
    )
}

export default CreateRecipe