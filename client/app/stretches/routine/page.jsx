"use client"

import React, { useEffect, useState } from 'react'
import RoutineCompleteBtn from '@components/stretch/RoutineCompleteBtn'
import Link from 'next/link'
import Spinner from '@components/ui/Spinner'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'

const StretchRoutine = () => {
    const auth = useAuthContext()
    const [routine, setRoutine] = useState({ name: '', stretches: [] })
    const [stretches, setStretches] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [nameExists, setNameExists] = useState(false)

    useEffect(() => {
        const fetchStretches = async () => {
            const stretchData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/stretch`)
            const stretchJSON = await stretchData.json()
            setStretches(stretchJSON)
        }
        fetchStretches()
    }, [])

    useEffect(() => {
        routine.stretches.length === 0 || !routine.stretches || !routine.name.length
            ? setSubmitDisabled(true) : setSubmitDisabled(false)
    }, [routine.stretches, routine.name])

    const removeStretch = (index) => {
        const updatedStretches = [...routine.stretches]
        updatedStretches.splice(index, 1)
        setRoutine({ ...routine, stretches: updatedStretches })
    }

    const createRoutine = async (e) => {
        e.preventDefault()
        if (routine.stretches.length >= 1) {
            setSubmitDisabled(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/stretch/routine/create`, {
                method: 'POST',
                body: JSON.stringify(routine),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
                },
                credentials: 'include'
            })
            if (response.ok) console.log('Routine created!')
            else setNameExists(true)
        }
    }

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <section className="w-full">
            <form onSubmit={(e) => createRoutine(e)} className="flex flex-col gap-5 w-full sm:w-3/4 max-w-[500px] mt-4 m-auto">
                <h2 className="big-heading">Create Stretch Routine</h2>
                {nameExists && <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>You already have a routine with this name.</span>
                </div>}
                <label>Name
                    <input
                        type="text"
                        value={routine.name}
                        onChange={(e) => setRoutine({ ...routine, name: e.target.value })}
                        placeholder="i.e. Morning Routine"
                        required
                    />
                </label>
                {routine.stretches && routine.stretches.map((stretch, index) => {
                    return (
                        stretch.length > 0 && <span className="badge badge-info gap-2" key={index}>
                            <button type="button" onClick={(index) => removeStretch(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                            {stretches.find(x => x._id === stretch).name}
                        </span>
                    )
                })}
                <label>Stretch
                    <select
                        onChange={(e) => {
                            if (e.target.value !== '') setRoutine({ ...routine, stretches: [...routine.stretches, e.target.value] })
                        }}
                        className="select select-bordered w-full"
                        defaultValue={''}>
                        <option value="">- Select Stretches -</option>
                        {stretches && stretches.map((stretch, index) => {
                            return (
                                <option key={index} value={stretch._id} className="flex flex-col gap-1">
                                    <strong>{stretch.name} - Muscle: {stretch.muscle}</strong>
                                </option>
                            )
                        })}
                    </select>
                </label>
                <button type="submit" className="btn btn-primary" disabled={submitDisabled}>Save Routine</button>
            </form>
        </section>
    )
}

export default StretchRoutine