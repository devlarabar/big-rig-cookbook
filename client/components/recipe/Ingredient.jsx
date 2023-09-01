"use client"

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

const Ingredient = (props) => {

    const [ items, setItems ] = useState('')
    const [ disabled, setDisabled ] = useState(true)

    useEffect(() => {
        (async () => {
            const itemsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/ingredients`)
            const itemsDataJSON = await itemsData.json()
            setItems(itemsDataJSON)
        })()
    }, [])

    useEffect(() => {
        if (items) {
            setDisabled(false)
        }
    }, [items])

    return (
        <div>
            <Downshift
                onChange={selection => props.onChange(selection ? selection : null)}
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
                                className="w-full rounded-md border border-gray-400 p-2"
                                placeholder="ingredient (i.e. beef - ground)" 
                                disabled={disabled}
                                key={props.keyIng}
                                required={props.ingInputRequired}
                            />
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

export default Ingredient