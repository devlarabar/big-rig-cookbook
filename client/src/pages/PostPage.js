import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { UserContext } from '../UserContext'

const PostPage = () => {
    const [ postInfo, setPostInfo ] = useState(null)

    const { userInfo } = useContext(UserContext)

    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [id])

    if (!postInfo) return '';
    return (
        <div className="postPage">
            <h2>{postInfo.title}</h2>
            <p className="postInfo">
            <a href="/" className="postAuthor">{postInfo.author.username}</a>
            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            </p>
            {userInfo.id === postInfo.author._id && (
                <div className="editPost flex flex-center">
                    <Link to={`/editpost/${postInfo._id}`} className="btn-post btn-post-edit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </Link>
                    <button className="btn-post btn-post-delete">Delete</button>
                </div>
            )}
            {/* <div className="coverImage">
                <img src={postInfo.cover ? `http://localhost:4000/${postInfo.cover}` : `http://localhost:4000/public/placeholder.png`} alt={postInfo.title} />
            </div> */}
            <div className="postIngredents">
                <ul>
                    {postInfo.ingredients.length > 0 ? postInfo.ingredients.map((x, i) => {
                            return (
                                <li key={`${i}-${x.ingredientName}`}>
                                    { x.ingredientName } - { x.ingredientQty }
                                </li>
                            )
                        }) : 'No ingredients specified.'
                    }
                </ul>
            </div>
            <p>Preparation time: {postInfo.prepTime} | Cook time: {postInfo.cookTime}</p>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}

export default PostPage