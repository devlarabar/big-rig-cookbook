import * as React from 'react'
import Downshift from 'downshift'

const items = [
    { value: 'chicken', title: 'deli' },
    { value: 'sausage' },
    { value: 'beef' },
    { value: 'beef - ground' },
    { value: 'beef - corned' },
    { value: 'steak' },
    { value: 'pork' },
    { value: 'pork - loin' },
    { value: 'pork - ground' },
    { value: 'turkey' },
    { value: 'turkey - ground' },
    { value: 'deli - turkey' },
    { value: 'deli - chicken' },
    { value: '' },
    { value: '' },
    { value: '' },
]

export const Ingredient = (props) => {

    function onSelection(selection) {
        props.onChange(props.index, selection)
    }

  return (
    <div>
        <Downshift
        onChange={selection => onSelection(selection ? selection.value : null)}
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
                    <input {...getInputProps({ value: props.value })}/>
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