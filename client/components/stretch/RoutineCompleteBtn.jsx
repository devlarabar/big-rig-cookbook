"use client"

import { useEffect, useState } from 'react'
import { CheckIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'

const RoutineCompleteBtn = ({ user, routine }) => {
    const [complete, setComplete] = useState(true)

    useEffect(() => {
        let today = new Date()
        today = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + String(today.getMinutes())
        let lastMarkedComplete = localStorage.getItem('markedCompleteAt')
        if (lastMarkedComplete !== today) setComplete(false)
    }, [])

    const markRoutineComplete = async () => {
        const markCompleteReq = await fetch(`/server/stretch/complete/${routine._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            body: JSON.stringify({ 'authUser': user.id })
        })
        const markComplete = await markCompleteReq.json()
        if (markComplete.success) setCompleted()
        else console.error('There was an error processing your request.')
    }

    const setCompleted = () => {
        let today = new Date()
        today = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + String(today.getMinutes())
        localStorage.setItem('markedCompleteAt', today)
        setComplete(true)
    }

    return (
        <div className="flex gap-4 items-center">
            <button
                onClick={markRoutineComplete}
                disabled={complete}
                className="btn btn-primary p-3 rounded-full"
            >
                {complete ? <CheckBadgeIcon className="w-6 h-6" /> : <CheckIcon className="w-6 h-6" />}
            </button>
            {complete && <span>Completed!</span>}
        </div>
    )
}

export default RoutineCompleteBtn