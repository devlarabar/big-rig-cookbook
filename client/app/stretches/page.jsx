"use client"

import { useEffect, useState } from "react"
import StretchCard from "@components/stretch/StretchCard"
import Spinner from '@components/ui/Spinner'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const StretchIndex = () => {
    const auth = useAuthContext()
    const [stretches, setStretches] = useState([])

    useEffect(() => {
        const fetchStretches = async () => {
            const stretchData = await fetch(`/server/stretch`)
            const stretchJSON = await stretchData.json()
            setStretches(stretchJSON)
        }
        fetchStretches()
    }, [])

    if (!auth?.checkAuth) return <Spinner />
    if (auth?.isAuthenticated() === "unauthenticated" || auth?.user === null) return redirect('/')

    return (
        <section className="w-full">
            <h2 className="big-heading mb-4">Stretches</h2>
            <section className="mb-4">
                <Link href="/stretches/routine">Click here</Link> to create your own stretch routines!
            </section>
            <section className="stretch-feed md:flex md:flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3">
                {stretches.length > 0 && stretches.map((stretch, index) => {
                    return (
                        <StretchCard stretch={stretch} user={auth.user} key={index} />
                    )
                })}
            </section>
        </section>
    )
}

export default StretchIndex