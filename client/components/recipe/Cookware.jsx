const Cookware = ({ recipe, setRecipe }) => {

    const handleInputChange = (e, index) => {
        const newCookware = e.target.value
        const cookwareList = [...recipe.cookware]
        cookwareList[index] = newCookware
        setRecipe({ ...recipe, cookware: cookwareList })
    }

    const handleRemoveClick = (index) => {
        const cookwareList = [...recipe.cookware]
        cookwareList.splice(index, 1)
        setRecipe({ ...recipe, cookware: cookwareList })
    }

    const handleAddClick = () => setRecipe({ ...recipe, cookware: [...recipe.cookware, ''] })

    return (
        <>
            {recipe.cookware.map((x, i) => {
                return (
                    <div key={i} className="flex flex-col gap-5">
                        <div className="flex flex-center gap-5">
                            <input
                                type="text"
                                name="cookwareName"
                                value={x}
                                onChange={e => handleInputChange(e, i)}
                                className="input input-bordered w-full"
                                placeholder="Microwave"
                                required
                            />
                            <div className="cookwareListButtons">
                                {recipe.cookware.length !== 1 && <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                            </div>
                        </div>
                        {recipe.cookware.length - 1 === i && <button
                            type="button"
                            className="btn btn-secondary w-1/3 min-w-[200px]"
                            onClick={handleAddClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add cookware
                        </button>}
                    </div>
                )
            }
            )}
        </>
    )
}

export default Cookware