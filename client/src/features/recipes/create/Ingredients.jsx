import { useState } from "react"
import AddIngredients from "./AddIngredients"
import { IngredientsList } from "./IngredientsList"
import IngQtyErr from "./IngQtyErr"

export const Ingredients = (props) => {

    const { ingList, setIngList } = props
    const [ingError, setIngError] = useState(false)

    const [ ingKey, setIngKey ] = useState('')
    const [ ingQtyKey, setIngQtyKey ] = useState('')
    const [ ingMeasureKey, setIngMeasureKey ] = useState('')

    function onAdd(newIngredient) {
        setIngError(false)
        if (!newIngredient.ingredient || !newIngredient.qty || newIngredient.qty === '0') {
            setIngError('qty')
            console.log('hi')
            return false
        }
        if (ingList.find(x => x.ingredient.name === newIngredient.ingredient.name)) {
            setIngError('duplicate')
            console.log('hidfg')
            return false
        }
        if (ingList[0] === '') {
            setIngError(false)
            ingList[0] = newIngredient
            const list = [...ingList]
            addToIngList(list)
            return true
        } else {
            setIngError(false)
            const list = [...ingList, newIngredient]
            addToIngList(list)
            return true
        }
        
    }

    function addToIngList(list) {
        setIngList(list)
        setIngKey(new Date())
        setIngQtyKey(`qty-${new Date()}`)
        setIngMeasureKey(`measure-${new Date()}`)
    }
    
  return (
    <div className="flex flex-column big-gap">
        <IngredientsList ingList={ingList} setIngList={setIngList} />
        {ingError && <IngQtyErr error={ingError} />}
        <AddIngredients onAdd={onAdd} ingList={ingList} ingKey={ingKey} ingQtyKey={ingQtyKey} ingMeasureKey={ingMeasureKey} />
    </div>
  )
}
