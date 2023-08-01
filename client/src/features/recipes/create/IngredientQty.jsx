import Downshift from 'downshift'

const items = [
    { value: '' },
    { value: 'cup' },
    { value: 'tbsp' },
    { value: 'tsp' },
    { value: 'lb' },
    { value: 'oz' },
    { value: 'L' },
    { value: 'mL' },
    { value: 'pint' },
    { value: 'qt' },
    { value: 'gal' },
    { value: 'slice' },
    { value: 'piece' }
]

export const IngredientQty = (props) => {


  return (
    <div className="flex big-gap form-recipe-qty">
        <div className="width-100">
            <input type="number" onChange={e => props.onChange(e.target.value)} placeholder="1"/>
        </div>
        <Downshift
        onChange={selection => props.onSelectMeasurement(selection ? selection.value : null)}
        itemToString={item => (item ? item.value : '')}
        name={props.name}
    >
        {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
        }) => (
            <div className="width-100">
                <div
                    {...getRootProps({}, { suppressRefError: true })}
                >
                    <input {...getInputProps()} placeholder="cup"/>
                </div>
                <ul {...getMenuProps()}>
                    {isOpen
                        ? items
                            .filter(item => !inputValue || item.value.includes(inputValue))
                            .map((item, index) => (
                                <li
                                    {...getItemProps({
                                        key: item.value,
                                        index,
                                        item,
                                        style: {
                                            backgroundColor:
                                                highlightedIndex === index ? 'lightgray' : 'white',
                                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                                        },
                                    })}
                                >
                                    {item.value}
                                </li>
                            ))
                        : null}
                </ul>
            </div>
        )}
    </Downshift>
    </div>
  )
}