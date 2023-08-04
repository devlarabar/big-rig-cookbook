import { useState, useEffect } from 'react'
import UserRecipes from '../features/userprofile/UserRecipes'
import UserCookbook from '../features/userprofile/UserCookbook'
import UserStretches from '../features/userprofile/UserStretches'
import { useOutletContext, useParams } from 'react-router-dom'
import Spinner from '../features/ui/Spinner'
import UserBadges from '../features/userprofile/UserBadges'
import { ReactComponent as Edit } from '../assets/heroicon-edit.svg'

const UserProfile = () => {
    const { user } = useParams()
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
            setUserAchievements('')
            setSection('')

            // Get this user's information
            const fetchUserInfo = await fetch(`http://localhost:4000/user/userprofile/${user}`)
            const info = await fetchUserInfo.json()
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
                <h2 className="main user-header flex flex-center med-gap">
                    Profile: 
                    <span className="user-username">{user}</span>
                    {isViewersProfile && <button className="btn-profile-edit"><Edit className="btn-profile-edit svg-20" /></button>}
                </h2>
                <UserBadges userAchievements={userAchievements} />
                <ul className="user-nav flex-center">
                    <li><button onClick={() => changeSection('Recipes')}>Recipes</button></li>
                    <li><button onClick={() => changeSection('Cookbook')}>Cookbook</button></li>
                    <li><button onClick={() => changeSection('Stretches')}>Stretches</button></li>
                </ul>
                <h3>{section}</h3>
                {section === 'Recipes' && <UserRecipes userRecipes={userRecipes} authUser={authUser} />}
                {section === 'Cookbook' && <UserCookbook userCookbook={userCookbook} authUser={authUser} />}
                {section === 'Stretches' && <UserStretches userStretches={userStretches} authUser={authUser} />}
            </>
        )
    }
}

export default UserProfile