import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'

const Post = ({ _id, title, summary, cover, content, author, prepTime, cookTime, createdAt, savedBy, userId, userDetails }) => {
	let clockStyle
	if ((prepTime + cookTime) < 30) {
		clockStyle = 'green'
	} else if ((prepTime + cookTime) < 60) {
		clockStyle = 'yellow'
	} else {
		clockStyle = 'red'
	}
	return (
		<div className="post" key={_id}>
			{/* <div className="post-image">
				<Link to={`/post/${_id}`}>
					<img src={cover ? `http://localhost:4000/${cover}` : `http://localhost:4000/public/placeholder.png`} alt={title} />
				</Link>
			</div> */}
			<div className="post-content">
				<Link to={`/post/${_id}`}>
					<h2 className="text-center">{title}</h2>
				</Link>
				<p className="post-info flex-center">
					<a href="/" className="post-author">{author.username}</a>
					<time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
				</p>
				<p className="post-time text-center bold"><span className={clockStyle}>{prepTime+cookTime} min</span></p>
				<SaveButton postId={_id} author={author} savedBy={savedBy} userId={userId} username={userDetails.username} />
			</div>
		</div>
	)
}

export default Post