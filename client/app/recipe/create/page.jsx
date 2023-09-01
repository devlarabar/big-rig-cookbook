"use client"

import CreateRecipeForm from '@components/recipe/CreateRecipeForm'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import Spinner from '@components/ui/Spinner'
import { useAuthContext } from '@contexts/AuthContext'

const CreateRecipe = () => {
    const auth = useAuthContext()
    const [doRedirect, setDoRedirect] = useState(false)

    useEffect(() => {
        if (doRedirect) redirect('/home')
    }, [doRedirect])

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')
    
    return (
        <div className="w-full max-w-screen-sm flex flex-center">
            <CreateRecipeForm setDoRedirect={setDoRedirect}/>
        </div>
    )
}

export default CreateRecipe