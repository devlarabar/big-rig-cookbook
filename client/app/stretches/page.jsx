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
            const stretchData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/server/stretch`)
            const stretchJSON = await stretchData.json()
            setStretches(stretchJSON)
        }
        fetchStretches()
    }, [])

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <section>
            <h2 className="big-heading mb-4">Stretches</h2>
            <section className="mb-4">
                <Link href="/stretches/routine">Click here</Link> to create your own stretch routines!
            </section>
            {stretches.length > 0 && stretches.map((stretch, index) => {
                return (
                    <div className="stretch" key={index}>
                        <StretchCard stretch={stretch} user={auth.user} />
                    </div>
                )
            })}
        </section>
    )
}

export default StretchIndex