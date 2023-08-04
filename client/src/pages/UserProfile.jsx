import { useState, useEffect } from 'react'
import UserRecipes from '../features/userprofile/UserRecipes'
import UserCookbook from '../features/userprofile/UserCookbook'
import UserStretches from '../features/userprofile/UserStretches'
import { useOutletContext, useParams } from 'react-router-dom'
import Spinner from '../features/ui/Spinner'
import UserAchievements from '../features/userprofile/UserAchievements'

const UserProfile = () => {
    const { user } = useParams()
    const [userProfile, setUserProfile] = useState('')
    const [userRecipes, setUserRecipes] = useState([])
    const [userCookbook, setUserCookbook] = useState('')
    const [userStretches, setUserStretches] = useState('')
    const [userAchievements, setUserAchievements] = useState('')
    const [section, setSection] = useState('')

    const { authUser } = useOutletContext()

    // Get user information of the profile being viewed
    useEffect(() => {
        (async function () {
            setUserRecipes('')
            setUserCookbook('')
            setUserStretches('')
            setSection('')

            // Get this user's information
            const fetchUserInfo = await fetch(`http://localhost:4000/user/userprofile/${user}`)
            const info = await fetchUserInfo.json()
            setUserProfile(info.userProfile)
            setUserRecipes(info.posts)
            setUserCookbook(info.cookbook)
            setUserStretches(info.stretches)
            setUserAchievements(info.profile.achievements)
        }())
    }, [user])

    const username = authUser?.username
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
                {section === 'Achievements' && <UserAchievements user={userProfile} userAchievements={userAchievements} authUser={authUser} />}
                {section === 'Recipes' && <UserRecipes user={userProfile} userRecipes={userRecipes} authUser={authUser} />}
                {section === 'Cookbook' && <UserCookbook user={userProfile} userCookbook={userCookbook} authUser={authUser} />}
                {section === 'Stretches' && <UserStretches user={userProfile} userStretches={userStretches} authUser={authUser} />}
            </>
        )
    }
}

export default UserProfile