import Post from './Post'
import { useState, useEffect } from 'react'

const UserRecipes = ({ user, userId, userDetails }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async function () {
            const fetchUserPosts = await fetch(`http://localhost:4000/viewposts/${user.username}`)
            const posts = await fetchUserPosts.json()
            setPosts(posts)
        }())
    }, [user, posts])

    if (posts.length < 1) {
        return (
            <span className="block-center text-center">Loading...</span>
        )
    } else {

        return (
            <>
                <p className="text-center">Total recipes created: {posts.length}</p>
                {posts.length > 0 && posts.map(post => (
                    <Post {...post} key={post._id} userId={userId} userDetails={userDetails} />
                ))}
            </>
        )
    }
}

export default UserRecipes