import { useEffect, useState } from "react"
import { Ingredient } from "./Ingredient"
import { IngredientQty } from "./IngredientQty"

const AddIngredients = (props) => {

    const [ name, setName ] = useState('')
    const [ qty, setQty ] = useState('')
    const [ measure, setMeasure ] = useState('')
    const [ ingredient, setIngredient ] = useState('')
    const [ newIng, setNewIng ] = useState(false)

    // Ingredients List: Handle click event of the Add button
    function handleAddClick() {
        const success = props.onAdd(ingredient)
        if (success) setNewIng(true)
    }

    function onSelectIngredient(selection) {
        if (selection) setName(selection)
    }
    function onSelectQty(selection) {
        if (selection) setQty(selection)
    }
    function onSelectMeasurement(selection) {
        if (selection) setMeasure(selection)
    }

    function onKeyDownQty(e) {
        if (qty.length === 1 && e.key === 'Backspace') {
            setQty('')
        } else {
            setQty(e.target.value)
        }
    }

    useEffect(() => {
        setIngredient({ ingredient: name, qty: qty, measurement: measure})
    }, [name, qty, measure])
    
    useEffect(() => {
        setName('')
        setQty('')
        setMeasure('')
        setNewIng(false)
    }, [newIng])

    return (
        <>
            <div className="flex flex-column">
                <Ingredient onChange={onSelectIngredient} name={name} key={props.ingKey}/>
                <IngredientQty 
                    onChange={onSelectQty} 
                    onKeyDown={onKeyDownQty} 
                    onSelectMeasurement={onSelectMeasurement} 
                    ingQtyKey={props.ingQtyKey} 
                    ingMeasureKey={props.ingMeasureKey} 
                />
                <button
                    type="button"
                    className="btn-add"
                    onClick={handleAddClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add Ingredient
                </button>
            </div>
        </>
    )
}

export default AddIngredients