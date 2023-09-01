"use client"

import { useState, useEffect } from 'react'
import UserRecipes from '@components/profile/UserRecipes'
import UserCookbook from '@components/profile/UserCookbook'
import UserStretches from '@components/profile/UserStretches'
import Spinner from '@components//ui/Spinner'
import UserBadges from '@components/profile/UserBadges'
import { useParams, redirect } from 'next/navigation'
import { useAuthContext } from 'contexts/AuthContext'
import Link from 'next/link'

const UserProfile = () => {
    const auth = useAuthContext()
    const { user } = useParams()
    const [userProfileDetails, setUserProfileDetails] = useState('')
    const [userRecipes, setUserRecipes] = useState([])
    const [userCookbook, setUserCookbook] = useState('')
    const [userStretches, setUserStretches] = useState('')
    const [userAchievements, setUserAchievements] = useState('')
    const [isViewersProfile, setIsViewersProfile] = useState(false)
    const defaultSection = 'Recipes'
    const [section, setSection] = useState(defaultSection)

    // Get user information of the profile being viewed
    useEffect(() => {
        (async function () {
            setUserProfileDetails('')
            setUserRecipes('')
            setUserCookbook('')
            setUserStretches('')
            setUserAchievements('')
            setSection(defaultSection)

            const fetchUserInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/userprofile/${user}`)
            const info = await fetchUserInfo.json()
            setUserProfileDetails(info.profile)
            setUserRecipes(info.posts)
            setUserCookbook(info.cookbook)
            setUserStretches(info.stretches)
            setUserAchievements(info.profile.achievements)
        }())
    }, [user])

    useEffect(() => {
        setIsViewersProfile(auth?.user?.username === user)
    }, [auth?.user])

    const changeSection = (x) => setSection(x)

    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')
    if (userProfileDetails === '404') return (<>This user does not exist!</>)

    return (
        <section className="profile">
            <aside className="flex flex-col items-center">
                <h2 className="big-heading flex flex-center gap-2">
                    <span className="user-username">{user}</span>
                    {isViewersProfile && <Link href="/profile/settings"><button className="btn-profile-edit">edit</button></Link>}
                </h2>
                <p className="mt-3">{userProfileDetails.description}</p>
                <UserBadges userAchievements={userAchievements} />
                <ul className="menu menu-horizontal bg-slate-300 rounded-box mt-6">
                    <li><button onClick={() => changeSection('Recipes')}>Recipes</button></li>
                    <li><button onClick={() => changeSection('Cookbook')}>Cookbook</button></li>
                    <li><button onClick={() => changeSection('Stretches')}>Stretches</button></li>
                </ul>
            </aside>
            <section>
                <h3 className="text-lg font-semibold mt-6 text-center mb-2">{section}</h3>
                {section === 'Recipes' && <UserRecipes userRecipes={userRecipes} authUser={auth.user} />}
                {section === 'Cookbook' && <UserCookbook userCookbook={userCookbook} authUser={auth.user} />}
                {section === 'Stretches' && <UserStretches userStretches={userStretches} authUser={auth.user} />}
            </section>
        </section>
    )
}

export default UserProfile