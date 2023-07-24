import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as Back } from './assets/heroicon-back.svg'
import { useState, useEffect } from 'react'

const PageNav = () => {

    const [searchInput, setSearchInput] = useState('')
    const [redirect, setRedirect] = useState(false)

    const url = useParams()

    // Set redirect back to false when it changes to true on search submit
    useEffect(() => {
        setRedirect(false)
    }, [redirect])

    // Clear search input
    useEffect(() => {
        if (url !== '')
        setSearchInput('')
    }, [url])

    // Back button functionality
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    // Submitting search form sets redirect to true, which then shows SearchResults
    async function search(e) {
        e.preventDefault()
        setRedirect(true)
    }

    return (
        <div className="pagenav flex flex-between">
            <button type="button" className="btn-back" onClick={goBack}><Back className="svg-30" /></button>
            <form onSubmit={(e) => search(e)} className="form-search">
                <input
                    type="search"
                    className="input-search"
                    name="input-search"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search Recipes" />
            </form>
            {redirect && <Navigate to={`/search/results/${searchInput}`}/>}
        </div>
    )
}

export default PageNav