import { IngredientQty } from "./IngredientQty"
import AddIngredients from "./AddIngredients"
import { IngredientsList } from "./IngredientsList"

export const Ingredients = (props) => {

    const { ingList, setIngList } = props

    function onAdd(newIngredient) {
        const list = [...ingList, newIngredient]
        setIngList(list)
    }
    
  return (
    <div>
        <IngredientsList ingList={ingList} setIngList={setIngList} />
        <AddIngredients onAdd={onAdd} />
    </div>
  )
}
