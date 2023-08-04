import { useState, useEffect } from "react"

const SaveButton = (props) => {
    const [saved, setSaved] = useState(false)
    const text = saved ? 'Un-save' : 'Save'

    const isAuthor = props.postId ? props.userId === props.author._id : undefined

    useEffect(() => {
        if (props.savedBy) {
            if (props.savedBy.includes(props.userId)) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [props.savedBy, props.userId])

    async function saveRecipe(post_id) {
        await fetch('http://localhost:4000/post/save', {
            method: 'PUT',
            body: JSON.stringify({ post: post_id, user: props.userId }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        setSaved(!saved)
    }

    async function saveStretch(stretch_id) {
        await fetch('http://localhost:4000/stretch/save', {
            method: 'PUT',
            body: JSON.stringify({ stretch: stretch_id, user: props.userId }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        setSaved(!saved)
    }

    if (props.postId) {
        return (
            <div className="flex flex-end">
                {!isAuthor && <button className="saveButton" onClick={() => saveRecipe(props.postId)}>{text}</button>}
                {isAuthor && <span className="text-small">This is your recipe!</span>}
            </div>
        )
    } else if (props.stretchId) {
        return (
            <div className="flex flex-end">
                <button className="saveButton" onClick={() => saveStretch(props.stretchId)}>{text}</button>
            </div>
        )
    }
}

export default SaveButton