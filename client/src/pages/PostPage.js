import { useState, useEffect, useContext } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import { UserContext } from '../UserContext'

// Import SVGs
import { ReactComponent as Edit } from '../assets/heroicon-edit.svg'

const PostPage = () => {
    const {id} = useParams()
    const [ postInfo, setPostInfo ] = useState(null)
    const { userInfo } = useContext(UserContext)
    const [ redirect, setRedirect ] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [id])

    async function deletePost() {
        const confirm = window.confirm('Are you sure you want to delete this post? This action is permanent!')
        if (confirm) {
            const response = await fetch(`http://localhost:4000/deletepost/${id}`, {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (response.ok) {
                setRedirect(true)
            }
        } else {
            return
        }
    }
    
    if (redirect) {
        return <Navigate to={`/`} />
    }

    if (!postInfo) return '';
    return (
        <div className="postPage">
            <h2>{postInfo.title}</h2>
            <div className="post-info flex flex-between">
            <p>
            <a href="/" className="postAuthor">{postInfo.author.username}</a> | <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            </p>
            {userInfo.id === postInfo.author._id && (
                <div className="editPost flex flex-center">
                    <Link to={`/editpost/${postInfo._id}`} className="btn-post btn-post-edit">
                        <Edit className="svg-20" />
                        Edit
                    </Link>
                    <button className="btn-post btn-post-delete" onClick={deletePost}>Delete</button>
                </div>
            )}
            </div>
            {/* <div className="coverImage">
                <img src={postInfo.cover ? `http://localhost:4000/${postInfo.cover}` : `http://localhost:4000/public/placeholder.png`} alt={postInfo.title} />
            </div> */}
            <h3>Time</h3>
            <p>Preparation time: {postInfo.prepTime} | Cook time: {postInfo.cookTime}</p>
            <h3>Ingredients</h3>
                <ul>
                    {postInfo.ingredients && postInfo.ingredients.length > 0 ? postInfo.ingredients.map((x, i) => {
                            return (
                                <li key={`${i}-${x.ingredientName}`}>
                                    { x.ingredientName } - { x.ingredientQty }
                                </li>
                            )
                        }) : 'No ingredients specified.'
                    }
                </ul>
            <h3>Cookware</h3>
                <ul>
                    {postInfo.cookware && postInfo.cookware.length > 0 ? postInfo.cookware.map((x, i) => {
                            return (
                                <li key={`${i}-${x}`}>
                                    { x }
                                </li>
                            )
                        }) : 'No cookware specified.'
                    }
                </ul>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}

export default PostPage