// import Post from './Post'
import { useState, useEffect } from 'react'

const UserStretches = ({ user }) => {
    // const [savedPosts, setSavedPosts] = useState([])

    // useEffect(() => {
    //     (async function () {
    //         const fetchUserPosts = await fetch(`http://localhost:4000/viewposts/${user}`)
    //         const posts = await fetchUserPosts.json()
    //         setSavedPosts(posts)
    //     }())
    // }, [user, savedPosts])

    // if (savedPosts.length < 1) {
    //     return (
    //         <span className="block-center text-center">Loading...</span>
    //     )
    // } else {

        return (
            <>
                <p className="text-center">Total stretches saved: (total here)</p>
                {/* {savedPosts.length > 0 && savedPosts.map(post => (
                    <Post {...post} key={post._id} />
                ))} */}
            </>
        )
    }
//}

export default UserStretches