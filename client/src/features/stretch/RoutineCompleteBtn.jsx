import { useEffect, useState } from 'react'

const RoutineCompleteBtn = () => {
    const [complete, setComplete] = useState(true)

    useEffect(() => {
        let today = new Date()
        today = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + String(today.getMinutes())
        let lastMarkedComplete = localStorage.getItem('markedCompleteAt')
        if (lastMarkedComplete !== today) setComplete(false)
    }, [])

    function markRoutineComplete() {
        let today = new Date()
        today = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + String(today.getMinutes())
        localStorage.setItem('markedCompleteAt', today)
        setComplete(true)
    }

    return (
        <div>
            <button onClick={markRoutineComplete} disabled={complete}>Done Routine</button>
        </div>
    )
}

export default RoutineCompleteBtn