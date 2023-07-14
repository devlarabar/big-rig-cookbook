import AddIngredients from "./AddIngredients"
import { IngredientsList } from "./IngredientsList"

export const Ingredients = (props) => {

    const { ingList, setIngList } = props

    function onAdd(newIngredient) {
        if (ingList[0] === '') {
            ingList[0] = newIngredient
            const list = [...ingList]
            setIngList(list)
        } else {
            const list = [...ingList, newIngredient]
            setIngList(list)
        }
    }
    
  return (
    <div class="flex flex-column big-gap">
        <IngredientsList ingList={ingList} setIngList={setIngList} />
        <AddIngredients onAdd={onAdd} />
    </div>
  )
}
