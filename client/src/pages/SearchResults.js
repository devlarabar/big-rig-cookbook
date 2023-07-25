import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../features/ui/Spinner'
import Post from '../features/recipes/view/Post'
import { UserContext } from '../features/users/UserContext'

const SearchResults = () => {
    
    const { query } = useParams()
    const [results, setResults] = useState('')

    useEffect(() => {
        (async function() {
            const response = await fetch(`http://localhost:4000/search/${query}`)
            const posts = await response.json()
            setResults(posts)
        }())
    }, [query])

    const { userInfo, setUserInfo } = useContext(UserContext)
	const [userDetails, setUserDetails] = useState({})

	useEffect(() => {
		(async function () {
			const userInfoResponse = await fetch('http://localhost:4000/user/profile', { credentials: 'include' })
			const userInfo = await userInfoResponse.json()
			setUserInfo(userInfo)
			if (userInfo?.id) {
				const userDataResponse = await fetch(`http://localhost:4000/user/getuserdata/${userInfo.id}`)
				const userDataInfo = await userDataResponse.json()
				console.log(userDataInfo)
				setUserDetails(userDataInfo)
			}
		}())
	}, [setUserInfo, setUserDetails])

	const username = userInfo?.username

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
                        <Post {...x} key={x._id} userId={userInfo.id} userDetails={userDetails} />
                    )
                })}
                {!results && <>No recipes found.</>}
            </div>
        )
    }
    
}

export default SearchResults