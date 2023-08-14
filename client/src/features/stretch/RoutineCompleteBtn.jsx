import { useEffect, useState } from 'react'

const RoutineCompleteBtn = ({ stretch, authUser }) => {
    const [complete, setComplete] = useState(true)

    useEffect(() => {
        let today = new Date()
        today = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + String(today.getMinutes())
        let lastMarkedComplete = localStorage.getItem('markedCompleteAt')
        if (lastMarkedComplete !== today) setComplete(false)
    }, [])

    async function markStretchComplete() {
        const markCompleteReq = await fetch(`http://localhost:4000/stretch/complete/${stretch._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'authUser': authUser})
        })
        const markComplete = await markCompleteReq.json()
        if (markComplete.success) {
            let today = new Date()
            today = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + String(today.getMinutes())
            localStorage.setItem('markedCompleteAt', today)
            setComplete(true)
        } else {
            console.error('There was an error processing your request.')
        }
    }

    return (
        <div>
            <button onClick={markStretchComplete} disabled={complete}>Done Stretch</button>
        </div>
    )
}

export default RoutineCompleteBtn