import React, { useEffect, useState } from 'react'
import RoutineCompleteBtn from '../features/stretch/RoutineCompleteBtn'
import { useOutletContext } from 'react-router-dom'

const StretchTracker = () => {
    const [routine, setRoutine] = useState('')
    const [stretches, setStretches] = useState('')
    const { authUser } = useOutletContext()

    useEffect(() => {
        (async function() {
            const getRoutine = await fetch(`http://localhost:4000/stretch/getroutine/${authUser.id}`)
            const routineData = await getRoutine.json()
            setRoutine(routineData)
        }())
    }, [authUser.id])

    useEffect(() => {
        (async function() {
            const getStretches = await fetch(`http://localhost:4000/stretch/getstretches/${authUser.id}`)
            const stretchData = await getStretches.json()
            setStretches(stretchData)
        }())
    }, [authUser.id])

    return (
        <div>
            
            {stretches && stretches.map((stretch, i) => {
                return (
                    <div key={i}>
                        {stretch.name} | <RoutineCompleteBtn stretch={stretch} authUser={authUser} />
                    </div>
                )
            })}
        </div>
    )
}

export default StretchTracker