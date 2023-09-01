import SaveButton from "@components/ui/SaveButton"

const StretchCard = ({ user, stretch }) => {
    return (
        <div className="stretch-card">
            <div className="card-body">
                <h3 className="card-title">{stretch.name}</h3>
                <p>{stretch.description}</p>
                <p><span>Muscle: {stretch.muscle}</span> | <span>Position: {stretch.position}</span></p>
                <SaveButton stretch={stretch} savedBy={stretch.savedBy} user={user} />
            </div>
        </div>
    )
}

export default StretchCard