const Directions = (props) => {
    const { directionsList, setDirectionsList } = props

    // cookwares List: Handle input change
    const handleInputChange = (e, index) => {
        const direction = e.target.value
        const list = [...directionsList]
        list[index] = direction
        setDirectionsList(list)
    }
   
    // cookwares List: Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...directionsList]
        list.splice(index, 1)
        setDirectionsList(list)
    }
   
    // cookwares List: Handle click event of the Add button
    const handleAddClick = () => {
        setDirectionsList([...directionsList, ''])
    }

    return (
        <>
            {directionsList.map((x, i) => {
                return (
                    <div key={i} className="flex flex-column big-gap">
                        <div className="flex med-gap">
                            <input
                                type="text"
                                name="direction"
                                value={x}
                                onChange={e => handleInputChange(e, i)}className="width-100"
                                placeholder="Microwave"
                                required 
                            />
                            <div className="cookwareListButtons">
                                {directionsList.length !== 1 && <button
                                    type="button"
                                    className="directionRm"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                            </div>
                        </div>
                        {directionsList.length - 1 === i && <button
                            type="button"
                            className="btn-add"
                            onClick={handleAddClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add direction
                        </button>}
                    </div>
                )
            }
            )}
        </>
    )
}

export default Directions