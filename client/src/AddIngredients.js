import { Ingredient } from "./Ingredient"

const AddIngredients = (ingredients) => {

    const { ingList, setIngList } = ingredients

    // Ingredients List: Handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...ingList]
        list[index][name] = value
        setIngList(list)
    }
   
    // Ingredients List: Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...ingList]
        list.splice(index, 1)
        setIngList(list)
    }
   
    // Ingredients List: Handle click event of the Add button
    const handleAddClick = () => {
        setIngList([...ingList, { ingredientName: '', ingredientQty: '' }])
    }

    const handleIngredientChange = (index, selection) => {
        const list = [...ingList]
        list[index]['ingredientName'] = selection
        setIngList(list)
    }

    return (
        <>
            <h3>Ingredients</h3>
            {ingList.map((x, i) => {
                return (
                    <div>
                        <div className="flex small-gap">
                            <Ingredient name={"ingredientName"} value={x.ingredientName} onChange={handleIngredientChange} index={i} />
                            {/* <input
                                type="text"
                                name="ingredientName"
                                value={x.ingredientName}
                                onChange={e => handleInputChange(e, i)}
                                required
                            /> */}
                            <input
                                type="text"
                                className="ingredientQty"
                                name="ingredientQty"
                                value={x.ingredientQty}
                                onChange={e => handleInputChange(e, i)}
                                required
                            />
                            <div className="ingredientListButtons">
                                {ingList.length !== 1 && <button
                                    type="button"
                                    className="ingredientRm"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                            </div>
                        </div>
                        {ingList.length - 1 === i && <button
                            type="button"
                            className="ingredientAdd"
                            onClick={handleAddClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add Ingredient
                        </button>}
                    </div>
                )
            }
            )}
        </>
    )
}

export default AddIngredients