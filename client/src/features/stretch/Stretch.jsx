const Stretch = ({ stretch }) => {
    return (
        <div>
            <h3>{stretch.name}</h3> 
            <p>{stretch.description}</p>
            <p><span>Muscle: {stretch.muscle}</span> | <span>Position: {stretch.position}</span></p>
        </div>
    )
}

export default Stretch