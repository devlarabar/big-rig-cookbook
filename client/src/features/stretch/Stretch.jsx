import SaveButton from "../ui/SaveButton"

const Stretch = ({ stretch, authUser }) => {
    return (
        <div>
            <h3>{stretch.name}</h3>
            <p>{stretch.description}</p>
            <p><span>Muscle: {stretch.muscle}</span> | <span>Position: {stretch.position}</span></p>
            <SaveButton stretchId={stretch._id} savedBy={stretch.savedBy} userId={authUser.id} />
        </div>
    )
}

export default Stretch