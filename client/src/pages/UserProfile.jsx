import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../features/users/UserContext'
import UserRecipes from '../features/userprofile/UserRecipes'
import UserCookbook from '../features/userprofile/UserCookbook'
import UserStretches from '../features/userprofile/UserStretches'
import { useParams } from 'react-router-dom'
import Spinner from '../features/ui/Spinner'
import UserAchievements from '../features/userprofile/UserAchievements'

const UserProfile = () => {
    const { user } = useParams()
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [ userDetails, setUserDetails] = useState({})
    const [ userProfile, setUserProfile ] = useState('')
    const [ userRecipes, setUserRecipes ] = useState([])
    const [ userCookbook, setUserCookbook ] = useState('')
    const [ userAchievements, setUserAchievements ] = useState('')
    const [ section, setSection ] = useState('')

    // Get userInfo for the user currently logged in
    useEffect(() => {
        (async function () {
            const userInfoResponse = await fetch('http://localhost:4000/user/profile', { credentials: 'include' })
            const userInfo = await userInfoResponse.json()
            setUserInfo(userInfo)
            if (userInfo?.id) {
                const userDataResponse = await fetch(`http://localhost:4000/user/getuserdata/${userInfo.id}`)
                const userDataInfo = await userDataResponse.json()
                setUserDetails(userDataInfo)
            }
        }())
    }, [setUserInfo, setUserDetails])

    // Get user information of the profile being viewed (todo: maybe convert these all into one request)
    useEffect(() => {
        (async function() {
            setUserRecipes('')
            setUserCookbook('')
            setSection('')

            // Get this user's information
            const fetchUserInfo = await fetch(`http://localhost:4000/user/userprofile/${user}`)
            const info = await fetchUserInfo.json()
            setUserProfile(info.userProfile)
            setUserCookbook(info.cookbook)
            setUserRecipes(info.posts)
            setUserAchievements(info.profile.achievements)
        }())
    }, [user])

    const username = userInfo?.username
    const isViewersProfile = username === user

    function changeSection(x) {
        setSection(x)
    }

    // if (user !== userFromUrl)
    if (!userRecipes && !userCookbook) {
        return (
            <>
                <Spinner />
            </>
        )
    } else {
        return (
            <>
                <h2 className="main user-header">Profile: <span className="user-username">{user}</span></h2>
                {isViewersProfile && <span className="block-center text-center">This is your profile!</span>}
                <ul className="user-nav flex-center">

                    <li><button onClick={() => changeSection('Achievements')}>Achievements</button></li>
                    <li><button onClick={() => changeSection('Recipes')}>Recipes</button></li>
                    <li><button onClick={() => changeSection('Cookbook')}>Cookbook</button></li>
                    <li><button onClick={() => changeSection('Stretches')}>Stretches</button></li>
                </ul>
                <h3>{section}</h3>
                {section === 'Achievements' && <UserAchievements  user={userProfile} userAchievements={userAchievements} userId={userInfo.id} userDetails={userDetails}/>}
                {section === 'Recipes' && <UserRecipes user={userProfile} userRecipes={userRecipes} userId={userInfo.id} userDetails={userDetails} />}
                {section === 'Cookbook' && <UserCookbook user={userProfile} userCookbook={userCookbook} userId={userInfo.id} userDetails={userDetails} />}
                {section === 'Stretches' && <UserStretches user={user} />}
            </>
        )
    }
}

export default UserProfile