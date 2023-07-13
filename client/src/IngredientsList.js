import React from 'react'

export const IngredientsList = (props) => {

    const { ingList, setIngList } = props

    return (
        <div>
            {ingList && ingList.map((x, i) => {
                return (
                    <div className="ing-row">
                        {x.name} - {x.qty} {x.measurement}
                    </div>
                )
            })}
        </div>
    )
}
