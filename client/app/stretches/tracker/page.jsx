"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Spinner from '@components/ui/Spinner'
import RoutineCard from '@components/stretch/RoutineCard'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'

const StretchTracker = () => {
    const auth = useAuthContext()
    const [routines, setRoutines] = useState('')
    const [stretches, setStretches] = useState('')

    useEffect(() => {
        const fetchRoutines = async () => {
            const getRoutines = await fetch(`/server/stretch/getroutine/${auth.user.id}`)
            const routineData = await getRoutines.json()
            setRoutines(routineData)
        }
        if (auth?.user) fetchRoutines()
    }, [auth?.user])

    useEffect(() => {
        const fetchStretches = async () => {
            const getStretches = await fetch(`/server/stretch/getstretches/${auth.user.id}`)
            const stretchData = await getStretches.json()
            setStretches(stretchData)
        }
        if (auth?.user) fetchStretches()
    }, [auth?.user])

    if (!auth?.checkAuth) return <Spinner />
    if (auth?.isAuthenticated() === "unauthenticated" || auth?.user === null) return redirect('/')

    return (
        <section className="w-full">
            <h2 className="big-heading mb-5">Stretch Routine Tracker</h2>
            <section className="stretch-feed">
                {routines && routines.map((routine, i) => {
                    return (
                        <RoutineCard routine={routine} user={auth.user} key={i} />
                    )
                })}
            </section>
        </section>
    )
}

export default StretchTracker