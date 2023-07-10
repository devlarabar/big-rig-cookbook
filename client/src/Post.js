import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'

// Import SVGs
import { ReactComponent as Clock } from './assets/fa-clock-solid.svg'


const Post = ({ _id, title, summary, cover, content, author, prepTime, cookTime, createdAt, savedBy, userId, userDetails }) => {
	let clockStyle
	if ((prepTime + cookTime) < 30) {
		clockStyle = 'fill-green'
	} else if ((prepTime + cookTime) < 60) {
		clockStyle = 'fill-yellow'
	} else {
		clockStyle = 'fill-red'
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
					<Link to={`/user/${author.username}`} className="post-author">{author.username}</Link>
					<time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
				</p>
				<div className="width-100 flex flex-between flex-align-end">
					<span className="bold flex-center small-gap"><Clock className={clockStyle} width="20px" />{prepTime+cookTime} min</span>
					<SaveButton postId={_id} author={author} savedBy={savedBy} userId={userId} username={userDetails.username} />
				</div>
				
			</div>
		</div>
	)
}

export default Post