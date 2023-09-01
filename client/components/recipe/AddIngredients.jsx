"use client"

import { useEffect, useState } from "react"
import Ingredient from '@components/recipe/Ingredient'
import IngredientQty from '@components/recipe/IngredientQty'

const AddIngredients = ({ recipe, setRecipe, onAdd }) => {

    const ingInputRequired = recipe.ingredients.length === 0

    // Keys to force re-render of ingredient inputs
    const [keyIng, setKeyIng] = useState('')
    const [keyQty, setKeyQty] = useState('')
    const [keyMeasure, setKeyMeasure] = useState('')

    const [ingredient, setIngredient] = useState({
        ingredient: '',
        qty: '',
        measurement: ''
    })
    const [newIng, setNewIng] = useState(false)

    const handleAddClick = () => onAdd(ingredient) && setNewIng(true)

    const onSelectIngredient = (selection) => selection && setIngredient({ ...ingredient, ingredient: selection })
    const onSelectQty = (selection) => selection && setIngredient({ ...ingredient, qty: selection })
    const onSelectMeasurement = (selection) => selection && setIngredient({ ...ingredient, measurement: selection })

    function onKeyDownQty(e) {
        ingredient.qty.length === 1 && e.key === 'Backspace' ? setIngredient({...ingredient, qty: ''})
        : setIngredient({...ingredient, qty: e.target.value})
    }

    useEffect(() => {
        setIngredient({
            ingredient: '',
            qty: '',
            measurement: ''
        })
        setNewIng(false)
        setKeyIng(Math.random()*1000)
        setKeyQty(Math.random()*1000)
        setKeyMeasure(Math.random()*1000)
    }, [newIng])

    return (
        <div className="flex flex-col gap-5">
            <Ingredient onChange={onSelectIngredient} key={keyIng} required={ingInputRequired} />
            <IngredientQty
                onChange={onSelectQty}
                onKeyDown={onKeyDownQty}
                onSelectMeasurement={onSelectMeasurement}
                keys={[keyQty, keyMeasure]}
            />
            <button
                type="button"
                className="btn btn-secondary w-1/3 min-w-[200px]"
                onClick={handleAddClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add Ingredient
            </button>
        </div>
    )
}

export default AddIngredients