import RoutineCompleteBtn from '@components/stretch/RoutineCompleteBtn'

const RoutineCard = ({ user, routine }) => {
    return (
        <div className="stretch-card">
            <div className="card-body">
                <h3 className="card-title">{routine.name}</h3>
                <ul className="list-disc pl-3">
                    {routine.stretches.map((stretch, index) => {
                        return <li key={index}>{stretch.name}</li>
                    })}
                </ul>
                <p><span className="font-bold">Current Streak:</span> {routine.streak}</p>
                <p><span className="font-bold">Longest Streak:</span> {routine.longestStreak}</p>
                <RoutineCompleteBtn routine={routine} user={user} />
            </div>
        </div>
    )
}

export default RoutineCard