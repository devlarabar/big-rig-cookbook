import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import UserRecipes from '../UserRecipes'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [ user, setUser ] = useState('')
    // const [ posts, setPosts ] = useState([])

    const location = useLocation()

    useEffect(() => {
        // execute on location change
        const userViewing = location.pathname.split('/').reverse()[0].trim()
        setUser(userViewing);
        console.log('Location changed!', location.pathname, user);
    }, [location, user]);

    useEffect(() => {
        (async function () {
            const userInfoResponse = await fetch('http://localhost:4000/profile', { credentials: 'include' })
            const userInfo = await userInfoResponse.json()
            setUserInfo(userInfo)

            // const fetchUserPosts = await fetch(`http://localhost:4000/viewposts/${userViewing}`)
            // const posts = await fetchUserPosts.json()
            // setPosts(posts)
        }())
    }, [setUserInfo])

    const username = userInfo?.username
    const isViewersProfile = username === user

    return (
        <>
            <h2 className="user-header">{user}'s profile</h2>
            {isViewersProfile && <span className="block-center text-center">This is your profile!</span>}
            <ul className="user-nav flex-center">
                <li><a href="/">Recipes</a></li>
                <li><a href="/">Cookbook</a></li>
                <li><a href="/">Stretches</a></li>
            </ul>
            <UserRecipes user={user} />
        </>
    )
}

export default UserProfile