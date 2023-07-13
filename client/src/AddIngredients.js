import { useEffect, useState } from "react"
import { Ingredient } from "./Ingredient"
import { IngredientQty } from "./IngredientQty"

const AddIngredients = (props) => {

    //const { ingList, setIngList } = props
    const [ name, setName ] = useState('')
    const [ qty, setQty ] = useState('')
    const [ measure, setMeasure ] = useState('')
    const [ ingredient, setIngredient ] = useState('')

    // Ingredients List: Handle click event of the Remove button
    // const handleRemoveClick = (index) => {
    //     const list = [...ingList]
    //     list.splice(index, 1)
    //     setIngList(list)
    // }

    // Ingredients List: Handle click event of the Add button
    function handleAddClick() {
        //setIngList([...ingList, { ingredientName: '', ingredientQty: '' }])
        setIngredient({ name: name, qty: qty, measurement: measure})
    }

    useEffect(() => {
        props.onAdd(ingredient)
    }, [ingredient])

    function onSelectIngredient(selection) {
        if (selection) {
            setName(selection)
        }
    }
    function onSelectQty(selection) {
        if (selection) {
            setQty(selection)
        }
    }
    function onSelectMeasurement(selection) {
        if (selection) {
            setMeasure(selection)
        }
    }


    return (
        <>
            <h3>Ingredients</h3>
            <div>
                <Ingredient onChange={onSelectIngredient} />
                <IngredientQty onChange={onSelectQty} onSelectMeasurement={onSelectMeasurement} />
                <button
                    type="button"
                    className="ingredientAdd"
                    onClick={handleAddClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add Ingredient
                </button>
            </div>
        </>
    )
}

export default AddIngredients