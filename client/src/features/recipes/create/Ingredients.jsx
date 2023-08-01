import { useState } from "react"
import AddIngredients from "./AddIngredients"
import { IngredientsList } from "./IngredientsList"
import IngQtyErr from "./IngQtyErr"

export const Ingredients = (props) => {

    const { ingList, setIngList } = props
    const [ingError, setIngError] = useState(false)

    function onAdd(newIngredient) {
        if (!newIngredient.ingredient || !newIngredient.qty) {
            setIngError('qty')
            console.log('hi')
            return false
        }
        if (ingList.find(x => x.ingredient === newIngredient.ingredient)) {
            setIngError('duplicate')
            console.log('hidfg')
            return false
        }
        if (ingList[0] === '') {
            ingList[0] = newIngredient
            const list = [...ingList]
            setIngList(list)
            setIngError(false)
            return true
        } else {
            const list = [...ingList, newIngredient]
            setIngList(list)
            setIngError(false)
            return true
        }
    }
    
  return (
    <div className="flex flex-column big-gap">
        <IngredientsList ingList={ingList} setIngList={setIngList} />
        {ingError && <IngQtyErr error={ingError} />}
        <AddIngredients onAdd={onAdd} ingList={ingList} />
    </div>
  )
}
