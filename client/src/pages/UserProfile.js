import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import UserRecipes from '../UserRecipes'
import { useLocation } from 'react-router-dom'
import Spinner from '../Spinner'

const UserProfile = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [ user, setUser ] = useState('')
    const [ section, setSection ] = useState('')
    // const [ posts, setPosts ] = useState([])

    const userFromUrl = useLocation().pathname.split('/').reverse()[0].trim()

    useEffect(() => {
        // execute on location change
        setUser(userFromUrl);
    }, [userFromUrl, user]);

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

    function changeSection(x) {
        setSection(x)
    }

    if (user !== userFromUrl) {
        return (
            <>
            <Spinner/>
            </>
        )
    } else {
    return (
        <>
            <h2 className="user-header">{user}'s profile</h2>
            {isViewersProfile && <span className="block-center text-center">This is your profile!</span>}
            <ul className="user-nav flex-center">
                <li><button onClick={() => changeSection('Recipes')}>Recipes</button></li>
                <li><button onClick={() => changeSection('Cookbook')}>Cookbook</button></li>
                <li><button onClick={() => changeSection('Stretches')}>Stretches</button></li>
            </ul>
            {section}
            <UserRecipes user={user} />
        </>
    )
}
}

export default UserProfile