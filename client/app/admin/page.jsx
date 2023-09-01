"use client"

import { useState } from 'react'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'
import Spinner from '@components/ui/Spinner'

const Admin = () => {

    const auth = useAuthContext()

    const [ingName, setIngName] = useState('')
    const [ingType, setIngType] = useState('')
    const [achievementName, setAchievementName] = useState('')
    const [recipeReq, setRecipeReq] = useState('')
    const [stretchReq, setStretchReq] = useState('')
    const [stretchName, setStretchName] = useState('')
    const [stretchDesc, setStretchDesc] = useState('')
    const [stretchPos, setStretchPos] = useState('')
    const [stretchMusc, setStretchMusc] = useState('')

    const formDataIngredient = {
        name: ingName,
        type: ingType,
        user: auth?.user
    }
    const formDataAchievement = {
        name: achievementName,
        requirements: {
            recipes: recipeReq,
            stretchStreak: stretchReq
        },
        user: auth?.user
    }
    const formDataStretch = {
        name: stretchName,
        description: stretchDesc,
        position: stretchPos,
        muscle: stretchMusc,
        user: auth?.user
    }
    function addIngredient() {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addingredient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataIngredient)
        })
    }
    function addAchievement() {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addachievement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataAchievement)
        })
    }
    function addStretch() {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addstretch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataStretch)
        })
    }

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')
    if (auth?.user) {
        if (!auth?.user.admin) return redirect('/home')
    }

    return (
        <div className="w-2/3 max-w-[500px] mb-5">
            <form onSubmit={addIngredient} className="flex flex-col gap-5 w-full">
                <h2>Add Ingredients</h2>
                <input
                    type="text"
                    placeholder={'Name'}
                    onChange={e => setIngName(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <select
                    onChange={e => setIngType(e.target.value)}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="" disabled>- Select -</option>
                    <option value="meat">Meat</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="spice">Spice</option>
                    <option value="cheese">Cheese</option>
                    <option value="grain">Grain</option>
                    <option value="bread">Bread</option>
                    <option value="fish">Fish</option>
                    <option value="sugar">Sugar</option>
                    <option value="dairy">Dairy</option>
                    <option value="egg">Egg</option>
                    <option value="hot">Hot (Spicy)</option>
                </select>
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>

            <form onSubmit={addAchievement} className="flex flex-col gap-5 w-full">
                <h2>Add Achievements</h2>
                <input
                    type="text"
                    placeholder={'Name'}
                    onChange={e => setAchievementName(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="number"
                    placeholder={'Recipe Requirement'}
                    onChange={e => setRecipeReq(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="number"
                    placeholder={'Stretch Streak Requirement'}
                    onChange={e => setStretchReq(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>

            <form onSubmit={addStretch} className="flex flex-col gap-5 w-full">
                <h2>Add Stretches</h2>
                <input
                    type="text"
                    placeholder={'Name'}
                    onChange={e => setStretchName(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="text"
                    placeholder={'Description'}
                    onChange={e => setStretchDesc(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <select
                    onChange={e => setStretchPos(e.target.value)}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="" disabled>- Select -</option>
                    <option value="standing">Standing</option>
                    <option value="seated">Seated</option>
                    <option value="laying face up">Laying - face up</option>
                    <option value="laying face down">Laying - face down</option>
                </select>
                <select
                    onChange={e => setStretchMusc(e.target.value)}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="" disabled>- Select -</option>
                    <option value="upper back">Back - upper</option>
                    <option value="lower back">Back - lower</option>
                    <option value="core">Core</option>
                    <option value="shoulder">Shoulder</option>
                    <option value="quadrucep">Quadrucep</option>
                    <option value="hamstring">Hamstring</option>
                    <option value="calf">Calf</option>
                    <option value="pectoral">Pectoral</option>
                    <option value="neck">Neck</option>
                    <option value="wrist">Wrist</option>
                    <option value="ankle">Ankle</option>
                </select>
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
        </div>
    )
}

export default Admin