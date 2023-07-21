import { useState, useEffect, useContext } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { format } from 'date-fns'
import { UserContext } from '../UserContext'
import NotFound from './NotFound'
import { ReactComponent as Edit } from '../assets/heroicon-edit.svg'

const PostPage = () => {
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState(null)
    const { userInfo } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/post/view/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo ? postInfo : null)
            })
        })
    }, [id])

    async function deletePost() {
        const confirm = window.confirm('Are you sure you want to delete this post? This action is permanent!')
        if (confirm) {
            const response = await fetch(`http://localhost:4000/post/delete/${id}`, {
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

    if (!postInfo) return (<NotFound />);
    return (
        <div className="post-page">
            <h2>{postInfo.title}</h2>
            <div className="post-info flex flex-between">
                <p>
                    <Link to={`/user/${postInfo.author.username}`} className="post-author">{postInfo.author.username}</Link> | <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
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
            <h3>Time</h3>
            <p>Preparation time: {postInfo.prepTime} | Cook time: {postInfo.cookTime}</p>
            <h3>Ingredients</h3>
            <ul>
                {postInfo.ingredients && postInfo.ingredients.length > 0 ? postInfo.ingredients.map((x, i) => {
                    return (
                        <li key={`${i}-${x.ingredient.name}`}>
                            {x.ingredient.name} - {x.qty} {x.measurement}
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
                            {x}
                        </li>
                    )
                }) : 'No cookware specified.'
                }
            </ul>
            <h3>Directions</h3>
            <ol>
                {postInfo.directions && postInfo.directions.length > 0 ? postInfo.directions.map((x, i) => {
                    return (
                        <li key={`${i}-${x[0]}`}>
                            {x}
                        </li>
                    )
                }) : 'No directions specified.'
                }
            </ol>
            {/* <div dangerouslySetInnerHTML={{__html:postInfo.content}} /> */}
        </div>
    )
}

export default PostPage