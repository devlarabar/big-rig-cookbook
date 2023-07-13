import React from 'react'

export const IngredientsList = (props) => {

    const { ingList, setIngList } = props

    // Ingredients List: Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...ingList]
        list.splice(index, 1)
        setIngList(list)
    }

    return (
        <div>
            {ingList && ingList.map((x, i) => {
                if (x.name) {
                    return (
                        <div className="ing-row" key={i}>
                            {x.name} - {x.qty} {x.measurement} <button type="button" onClick={() => handleRemoveClick(i)}>Delete</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}
