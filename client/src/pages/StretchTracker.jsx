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
    }, [authUser.id])

    return (
        <div>
            <RoutineCompleteBtn />
            {routine && routine.map((x, i) => {
                return (
                    <div key={i}>
                        {x.name}
                    </div>
                )
            })}
        </div>
    )
}

export default StretchTracker