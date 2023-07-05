import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Post = ({ _id, title, summary, cover, content, author, createdAt, userId, userDetails }) => {
	const [ savedPost, setSavedPost ] = useState(false)

	let userSavedPosts = userDetails.savedPosts

	useEffect(() => {
			if (userSavedPosts) {
				if (userSavedPosts.includes(_id)) {
					setSavedPost(true)
				} else {
					setSavedPost(false)
				}
			}
	}, [userSavedPosts, setSavedPost, _id])
	
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
		<div className="post" key={_id}>
			<div className="post-image">
				<Link to={`/post/${_id}`}>
					<img src={cover ? `http://localhost:4000/${cover}` : `http://localhost:4000/public/placeholder.png`} alt={title} />
				</Link>
			</div>
			<div className="post-content">
				<Link to={`/post/${_id}`}>
					<h2 className="text-center">{title}</h2>
				</Link>
				<p className="post-info flex-center">
					<a href="/" className="post-author">{author.username}</a>
					<time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
				</p>
				<p className="post-summary text-center">{summary}
				</p>
				
				{!savedPost && <span className="savePost" onClick={() => saveRecipe(_id)}>Save Recipe</span>}
				{savedPost && <span className="unsavePost" onClick={() => saveRecipe(_id)}>Un-save Recipe</span>}
				
			</div>
		</div>
	)
}

export default Post