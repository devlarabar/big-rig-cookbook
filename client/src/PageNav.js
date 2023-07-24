import { Navigate, useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from './assets/heroicon-back.svg'
import { useState, useEffect } from 'react';
import SearchResults from './pages/SearchResults';

const PageNav = () => {

    const [searchInput, setSearchInput] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setRedirect(false)
    }, [redirect])

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

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
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search Recipes" />
            </form>
            {redirect && <Navigate to={`/search/results/${searchInput}`}/>}
        </div>
    )
}

export default PageNav