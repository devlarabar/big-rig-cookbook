import Downshift from 'downshift'
import { useEffect, useState } from 'react'

// const items = [
//     { value: 'chicken', title: 'deli' },
//     { value: 'sausage' },
//     { value: 'beef' },
//     { value: 'beef - ground' },
//     { value: 'beef - corned' },
//     { value: 'steak' },
//     { value: 'pork' },
//     { value: 'pork - loin' },
//     { value: 'pork - ground' },
//     { value: 'turkey' },
//     { value: 'turkey - ground' },
//     { value: 'deli - turkey' },
//     { value: 'deli - chicken' },
//     { value: '' },
//     { value: '' },
//     { value: '' },
// ]

export const Ingredient = (props) => {

    const [ items, setItems ] = useState('')

    useEffect(() => {
        (async () => {
            const itemsData = await fetch('http://localhost:4000/data/ingredients')
            const itemsDataJSON = await itemsData.json()
            setItems(itemsDataJSON)
        })()
    })

    return (
        <div>
            <Downshift
                onChange={selection => props.onChange(selection ? selection.value : null)}
                itemToString={item => (item ? item.name : '')}
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
                            {...getRootProps({}, { suppressRefError: true })}
                        >
                            <input {...getInputProps()}
                            className="width-100" placeholder="beef - ground"/>
                        </div>
                        <ul {...getMenuProps()}>
                            {isOpen
                                ? items
                                    .filter(item => !inputValue || item.name.includes(inputValue))
                                    .map((item, index) => (
                                        <li
                                            {...getItemProps({
                                                key: item.name,
                                                index,
                                                item,
                                                style: {
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                },
                                            })}
                                        >
                                            {item.name}
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