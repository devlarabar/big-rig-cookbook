"use client"

import { useEffect, useState } from "react"
import StretchCard from "@components/stretch/StretchCard"
import Link from 'next/link'
import Spinner from '@components/ui/Spinner'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'

const StretchIndex = () => {
    const auth = useAuthContext()
    const [stretches, setStretches] = useState([])

    useEffect(() => {
        const fetchStretches = async () => {
            const stretchData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stretch`)
            const stretchJSON = await stretchData.json()
            setStretches(stretchJSON)
        }
        fetchStretches()
    }, [])

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <div>
            <Link href={'/stretch/tracker'}><button>Stretch Tracker</button></Link>
            {stretches.length > 0 && stretches.map((stretch, index) => {
                return (
                    <div className="stretch" key={index}>
                        <StretchCard stretch={stretch} user={auth.user} />
                    </div>
                )
            })}
        </div>
    )
}

export default StretchIndex