const Directions = ({ recipe, setRecipe }) => {

    const handleInputChange = (e, index) => {
        const newDirection = e.target.value
        const directionsList = [...recipe.directions]
        directionsList[index] = newDirection
        setRecipe({ ...recipe, directions: directionsList })
    }
   
    const handleRemoveClick = (index) => {
        const directionList = [...recipe.directions]
        directionList.splice(index, 1)
        setRecipe({ ...recipe, directions: directionList })
    }
   
    const handleAddClick = () => setRecipe({ ...recipe, directions: [...recipe.directions, ''] })

    return (
        <>
            {recipe.directions.map((x, i) => {
                return (
                    <div key={i} className="flex flex-col gap-5">
                        <div className="flex flex-center gap-5">
                            <input
                                type="text"
                                name="direction"
                                value={x}
                                onChange={e => handleInputChange(e, i)}
                                className="w-full rounded-md border border-gray-400 p-2"
                                placeholder="Add spices"
                                required 
                            />
                            <div>
                                {recipe.directions.length !== 1 && <button
                                    type="button"
                                    className="black_btn"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                            </div>
                        </div>
                        {recipe.directions.length - 1 === i && <button
                            type="button"
                            className="black_btn max-w-xs"
                            onClick={handleAddClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add direction
                        </button>}
                    </div>
                )
            }
            )}
        </>
    )
}

export default Directions