import RoutineCompleteBtn from '@components/stretch/RoutineCompleteBtn'

const RoutineCard = ({ user, routine }) => {
    return (
        <div className="stretch-card">
            <div className="card-body">
                <h3 className="card-title">{routine.name}</h3>
                <ul className="list-disc pl-5">
                    {routine.stretches.map((stretch, index) => {
                        return <li key={index}>{stretch.name}</li>
                    })}
                </ul>
                <hr className="divider" />
                <p className="flex justify-between gap-2"><span className="font-bold">Streak:</span> {routine.streak} <span className="font-bold">Longest:</span> {routine.longestStreak}</p>
                <RoutineCompleteBtn routine={routine} user={user} />
            </div>
        </div>
    )
}

export default RoutineCard