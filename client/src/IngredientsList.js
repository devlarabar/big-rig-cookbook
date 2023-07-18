import React from 'react'
import { ReactComponent as Minus } from './assets/heroicon-minus.svg'

export const IngredientsList = (props) => {

    const { ingList, setIngList } = props

    // Ingredients List: Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...ingList]
        list.splice(index, 1)
        setIngList(list)
    }

    return (
        <div className="ing-list flex flex-column med-gap">
            {ingList && ingList.map((x, i) => {
                if (x.ingredient?.name) {
                    return (
                        <div className="ing-row flex flex-between flex-align-center" key={i}>
                            {x.ingredient.name} - {x.qty} {x.measurement} 
                            <button 
                            type="button"
                            className="btn-svg" 
                            onClick={() => handleRemoveClick(i)}>
                                <Minus className="svg-20"/>
                            </button>
                        </div>
                    )
                }
            })}
        </div>
    )
}
