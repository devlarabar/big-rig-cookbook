const AddCookware = (cookware) => {

    const { cookwareList, setCookwareList } = cookware

    // cookwares List: Handle input change
    const handleInputChange = (e, index) => {
        const cookwareName = e.target.value
        const list = [...cookwareList]
        list[index] = cookwareName
        setCookwareList(list)
    }
   
    // cookwares List: Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...cookwareList]
        list.splice(index, 1)
        setCookwareList(list)
    }
   
    // cookwares List: Handle click event of the Add button
    const handleAddClick = () => {
        setCookwareList([...cookwareList, ''])
    }

    return (
        <>
            {cookwareList.map((x, i) => {
                return (
                    <div key={i} className="flex flex-column med-gap">
                        <div className="flex small-gap">
                            <input
                                type="text"
                                name="cookwareName"
                                value={x}
                                onChange={e => handleInputChange(e, i)}
                                required className="width-100"
                            />
                            <div className="cookwareListButtons">
                                {cookwareList.length !== 1 && <button
                                    type="button"
                                    className="cookwareRm"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                            </div>
                        </div>
                        {cookwareList.length - 1 === i && <button
                            type="button"
                            className="ingredientAdd"
                            onClick={handleAddClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add cookware
                        </button>}
                    </div>
                )
            }
            )}
        </>
    )
}

export default AddCookware