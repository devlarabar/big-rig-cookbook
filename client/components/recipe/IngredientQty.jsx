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

const IngredientQty = (props) => {
  return (
    <div className="flex gap-5 justify-between items-start">
        <div className="w-full">
            <input 
                type="number" 
                onChange={e => {props.onChange(e.target.value); props.onKeyDown(e)}} 
                placeholder="1" 
                key={props.keys[0]}
                className="input input-bordered w-full"
            />
        </div>
        <Downshift
            onChange={selection => props.onSelectMeasurement(selection ? selection.value : null)}
            itemToString={item => (item ? item.value : '')}
            name={props.name}
            key={props.keys[1]}
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
            <div className="w-full">
                <div
                    {...getRootProps({}, { suppressRefError: true })}
                >
                    <input {...getInputProps()} 
                        placeholder="cup" 
                        className="input input-bordered w-full"
                    />
                </div>
                <ul {...getMenuProps()} className="overflow-hidden rounded-xl mt-2">
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
                                    className="py-1 px-3 bg-base-100 hover:bg-primary"
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

export default IngredientQty