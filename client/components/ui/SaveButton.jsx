"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SaveButton = ({ user, recipe, stretch }) => {
    const [saved, setSaved] = useState(false)
    const iconSize = 25
    const isAuthor = recipe?._id ? user.id === recipe.author._id : undefined

    useEffect(() => {
        if (recipe?.savedBy) {
            if (recipe.savedBy.includes(user.id)) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [recipe, user.id])

    useEffect(() => {
        if (stretch?.savedBy) {
            if (stretch.savedBy.includes(user.id)) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [stretch, user.id])

    async function saveRecipe(recipe_id) {
        console.log(user.id)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/recipe/save`, {
            method: 'PUT',
            body: JSON.stringify({ recipe: recipe_id, user: user.id }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            credentials: 'include'
        })
        setSaved(!saved)
    }

    async function saveStretch(stretch_id) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/stretch/save`, {
            method: 'PUT',
            body: JSON.stringify({ stretch: stretch_id, user: user.id }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            credentials: 'include'
        })
        setSaved(!saved)
    }

    if (recipe?._id) {
        return (
            <div className="flex flex-end">
                {!isAuthor &&
                    <button className="btn btn-square rounded-full dark:bg-primary" onClick={() => saveRecipe(recipe._id)}>
                        {saved
                            ? <Image
                                src="/assets/icons/heroicon-unsave.svg"
                                alt="Un-Save"
                                width={iconSize}
                                height={iconSize}
                            />
                            : <Image
                                src="/assets/icons/heroicon-save.svg"
                                alt="Save"
                                width={iconSize}
                                height={iconSize}
                            />}
                    </button>}
            </div>
        )
    } else if (stretch) {
        return (
            <div className="flex flex-end">
                <button className="btn btn-square rounded-full dark:bg-primary" onClick={() => saveStretch(stretch._id)}>
                    {saved
                        ? <Image
                            src="/assets/icons/heroicon-unsave.svg"
                            alt="Un-Save"
                            width={iconSize}
                            height={iconSize}
                        />
                        : <Image
                            src="/assets/icons/heroicon-save.svg"
                            alt="Save"
                            width={iconSize}
                            height={iconSize}
                        />}
                </button>
            </div>
        )
    }
}

export default SaveButton