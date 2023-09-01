"use client"

import React, { useEffect, useState } from 'react'
import RoutineCompleteBtn from '@components/stretch/RoutineCompleteBtn'
import Link from 'next/link'
import Spinner from '@components/ui/Spinner'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'

const StretchRoutine = () => {
    const auth = useAuthContext()
    const [routine, setRoutine] = useState('')
    const [stretches, setStretches] = useState('')

    useEffect(() => {
        const fetchRoutine = async () => {
            const getRoutine = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stretch/getroutine/${auth.user.id}`)
            const routineData = await getRoutine.json()
            setRoutine(routineData)
        }
        if (auth?.user) fetchRoutine()
    }, [auth?.user])

    useEffect(() => {
        const fetchStretches = async () => {
            const getStretches = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stretch/getstretches/${auth.user.id}`)
            const stretchData = await getStretches.json()
            setStretches(stretchData)
        }
        if (auth?.user) fetchStretches()
    }, [auth?.user])

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <div>
            {stretches && stretches.map((stretch, i) => {
                return (
                    <div key={i}>
                        {stretch.name} | <RoutineCompleteBtn stretch={stretch} user={auth.user} />
                    </div>
                )
            })}
        </div>
    )
}

export default StretchRoutine