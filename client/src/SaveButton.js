import { useState, useEffect } from "react"

const SaveButton = ({ postId, author, savedBy, userId, username }) => {
    const [savedPost, setSavedPost] = useState(false)

    const isAuthor = username === author.username
    const text = savedPost ? 'Un-save' : 'Save'

    useEffect(() => {
        if (savedBy) {
            if (savedBy.includes(userId)) {
                setSavedPost(true)
            } else {
                setSavedPost(false)
            }
        }
    }, [savedBy, userId])

    async function saveRecipe(post_id) {
        await fetch('http://localhost:4000/savepost', {
            method: 'PUT',
            body: JSON.stringify({ post: post_id, user: userId }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        setSavedPost(!savedPost)
    }

    return (
        <>
        <div className="flex flex-end">
            {!isAuthor && <button className="saveButton" onClick={() => saveRecipe(postId)}>{text}</button>}
        </div>
        </>
        
    )
}

export default SaveButton