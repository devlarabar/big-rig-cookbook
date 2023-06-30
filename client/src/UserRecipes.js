import Post from './Post'
import { useState, useEffect } from 'react'
// import { UserContext } from './UserContext'

const UserRecipes = ({ user }) => {
    // const { userInfo, setUserInfo } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async function () {
            // const userInfoResponse = await fetch('http://localhost:4000/profile', { credentials: 'include' })
            // const userInfo = await userInfoResponse.json()
            // setUserInfo(userInfo)

            const fetchUserPosts = await fetch(`http://localhost:4000/viewposts/${user}`)
            const posts = await fetchUserPosts.json()
            setPosts(posts)
        }())
    }, [user, posts])

    // const username = userInfo?.username
    // const isViewersProfile = username === user

    return (
        <>
            <p className="text-center">Total recipes created: {posts.length}</p>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} key={post._id} />
            ))}
        </>
    )
}

export default UserRecipes