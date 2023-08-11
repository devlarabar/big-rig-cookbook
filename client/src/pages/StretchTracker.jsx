import React, { useEffect, useState } from 'react'
import RoutineCompleteBtn from '../features/stretch/RoutineCompleteBtn'
import { useOutletContext } from 'react-router-dom'

const StretchTracker = () => {
    const [routine, setRoutine] = useState('')
    const { authUser } = useOutletContext()

    useEffect(() => {
        (async function() {
            const getRoutine = await fetch(`http://localhost:4000/stretch/getroutine/${authUser.id}`)
            const routineData = await getRoutine.json()
            setRoutine(routineData)
        }())
    }, [])

    return (
        <div>
            <RoutineCompleteBtn />
        </div>
    )
}

export default StretchTracker