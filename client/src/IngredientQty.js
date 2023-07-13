import Downshift from 'downshift'

const items = [
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
]

export const IngredientQty = (props) => {


  return (
    <div>
        <input type="number" onChange={e => props.onChange(e.target.value)} />
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
            <div>
                <div
                    style={{ display: 'inline-block' }}
                    {...getRootProps({}, { suppressRefError: true })}
                >
                    <input {...getInputProps()}/>
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