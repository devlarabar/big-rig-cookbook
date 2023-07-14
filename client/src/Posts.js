import { useEffect, useState } from "react"
import Post from "./Post"

const Posts = (props) => {
    const [posts, setPosts] = useState([])
    const { userDetails, setUserDetails, userInfo } = props

    useEffect(() => {
        fetch('http://localhost:4000/viewposts').then(response => {
            response.json().then(posts => {
                setPosts(posts)
            })
        })
    }, [])

    return (
        <div>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} key={post._id} userId={userInfo.id} userDetails={userDetails} />
            ))}
        </div>
    )
}

export default Posts