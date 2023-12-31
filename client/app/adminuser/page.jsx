"use client"

import { useState } from 'react'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'
import Spinner from '@components/ui/Spinner'
import Alert from '@components/ui/Alert'

const Admin = () => {

    const auth = useAuthContext()
    const [message, setMessage] = useState(null)

    const [ingName, setIngName] = useState('')
    const [ingType, setIngType] = useState('')

    const [achievementName, setAchievementName] = useState('')
    const [recipeReq, setRecipeReq] = useState('')
    const [stretchReq, setStretchReq] = useState('')

    const [stretchName, setStretchName] = useState('')
    const [stretchDesc, setStretchDesc] = useState('')
    const [stretchPos, setStretchPos] = useState('')
    const [stretchMusc, setStretchMusc] = useState('')

    const [username, setUsername] = useState('')

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
    const addIngredient = (e) => {
        e.preventDefault()
        fetch(`/server/admin/addingredient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            body: JSON.stringify(formDataIngredient)
        })
    }
    const addAchievement = (e) => {
        e.preventDefault()
        fetch(`/server/admin/addachievement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            body: JSON.stringify(formDataAchievement)
        })
    }
    const addStretch = (e) => {
        e.preventDefault()
        fetch(`/server/admin/addstretch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            body: JSON.stringify(formDataStretch)
        })
    }

    const deleteUser = async (e) => {
        e.preventDefault()
        const confirmation = confirm("Are you sure you want to delete this user? This action is irreversible.")
        if (confirmation) {
            const response = await fetch('/server/admin/deleteuser', {
                method: 'POST',
                body: JSON.stringify({ username: username }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
                },
                credentials: 'include'
            })
            const info = await response.json()
            if (info.success) {
                setMessage({ message: `Successfully deleted user: ${username}`, type: 'success' })
            } else {
                setMessage({ message: info.error, type: 'error' })
            }
        }
    }

    if (!auth?.checkAuth) return <Spinner />
    if (auth?.isAuthenticated() === "unauthenticated" || auth?.user === null) return redirect('/')
    if (auth?.user) {
        if (!auth?.user.admin) return redirect('/home')
    }

    return (
        <div className="sm:w-3/4 max-w-[500px] w-full mb-5 p-x-3">
            {message && <aside className="mb-3 w-full"><Alert message={message.message} alertType={message.type} /></aside>}
            <form onSubmit={(e) => addIngredient(e)} className="flex flex-col gap-5 w-full">
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

            <form onSubmit={(e) => addAchievement(e)} className="flex flex-col gap-5 w-full mt-5">
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

            <form onSubmit={(e) => addStretch(e)} className="flex flex-col gap-5 w-full mt-5">
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

            <form onSubmit={(e) => deleteUser(e)} className="flex flex-col gap-5 w-full mt-5">
                <h2>Delete User</h2>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    className="input input-bordered w-full"
                    required
                />
                <button type="submit" className="btn btn-error w-full">Delete</button>
            </form>
        </div>
    )
}

export default Admin