import Post from '../Post'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'

const UserProfile = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async function () {
            const userInfoResponse = await fetch('http://localhost:4000/profile', { credentials: 'include' })
            const userInfo = await userInfoResponse.json()
            setUserInfo(userInfo)

            const fetchUserPosts = await fetch(`http://localhost:4000/viewposts/${userInfo?.username}`)
            const posts = await fetchUserPosts.json()
            setPosts(posts)
        }())
    }, [])

    const username = userInfo?.username

    return (
        <>
            <h2 className="user-header">{username}'s profile</h2>
            <ul className="user-nav flex-center">
                <li><a href="/">Recipes</a></li>
                <li><a href="/">Cookbook</a></li>
                <li><a href="/">Stretches</a></li>
            </ul>
            <p className="text-center">Total recipes created: {posts.length}</p>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} key={post._id} />
            ))}
        </>
    )
}

export default UserProfile