import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner'
import Post from '../Post'

const SearchResults = () => {
    
    const { query } = useParams()
    const [results, setResults] = useState('')

    useEffect(() => {
        (async function() {
            const response = await fetch(`http://localhost:4000/search/${query}`)
            const posts = await response.json()
            setResults(posts)
            console.log(results)
        }())
    }, [query])

    if (results === '' || results === undefined) {
        return (
            <>
                <Spinner />
            </>
        )
    } else {
        return (
            <div>
                {results && results.map(x => {
                    return(
                        <div>
                        {x.title}
                        </div>
                    )
                })}
                {!results && <>No recipes found.</>}
            </div>
        )
    }
    
}

export default SearchResults