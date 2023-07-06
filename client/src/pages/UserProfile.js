import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import UserRecipes from '../UserRecipes'
import UserCookbook from '../UserCookbook'
import UserStretches from '../UserStretches'
import { useLocation } from 'react-router-dom'
import Spinner from '../Spinner'

const UserProfile = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [ userDetails, setUserDetails] = useState({})
    const [ user, setUser ] = useState('')
    const [ userProfile, setUserProfile ] = useState('')
    const [ userRecipes, setUserRecipes ] = useState([])
    const [ userCookbook, setUserCookbook ] = useState('')
    const [ section, setSection ] = useState('')

    const userFromUrl = useLocation().pathname.split('/').reverse()[0].trim()

    useEffect(() => {
        // execute on location change
        setUser(userFromUrl);
        setSection('')
    }, [userFromUrl, user]);

    // Get userInfo for the user currently logged in
    useEffect(() => {
        (async function () {
            const userInfoResponse = await fetch('http://localhost:4000/profile', { credentials: 'include' })
            const userInfo = await userInfoResponse.json()
            setUserInfo(userInfo)
            if (userInfo?.id) {
                const userDataResponse = await fetch(`http://localhost:4000/getuserdata/${userInfo.id}`)
                const userDataInfo = await userDataResponse.json()
                setUserDetails(userDataInfo)
            }
        }())
    }, [setUserInfo, setUserDetails])

    // Get user information of the profile being viewed (todo: maybe convert these all into one request)
    useEffect(() => {
        (async function() {
            if (user) {
                const userProfileResponse = await fetch(`http://localhost:4000/getuserdata_un/${user}`)
                const userProfile = await userProfileResponse.json()
                setUserProfile(userProfile)

                // Get this user's cookbook
                const fetchUserCookbook = await fetch(`http://localhost:4000/cookbook/${user}`)
                const cookbook = await fetchUserCookbook.json()
                setUserCookbook(cookbook)

                // Get this user's recipes
                const fetchUserRecipes = await fetch(`http://localhost:4000/viewposts/${user}`)
                const recipes = await fetchUserRecipes.json()
                setUserRecipes(recipes)
            }
        }())
    }, [user])

    const username = userInfo?.username
    const isViewersProfile = username === user

    function changeSection(x) {
        setSection(x)
    }

    if (user !== userFromUrl) {
        return (
            <>
                <Spinner />
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
                <h3>{section}</h3>
                {section === 'Recipes' && <UserRecipes user={userProfile} userRecipes={userRecipes} userId={userInfo.id} userDetails={userDetails} />}
                {section === 'Cookbook' && <UserCookbook user={userProfile} userCookbook={userCookbook} userId={userInfo.id} userDetails={userDetails} />}
                {section === 'Stretches' && <UserStretches user={user} />}
            </>
        )
    }
}

export default UserProfile