import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'

// Import SVGs
import { ReactComponent as Clock } from './assets/fa-clock-solid.svg'
import { ReactComponent as ArrowRight } from './assets/heroicon-arrow-right.svg'


const Post = ({ _id, title, author, prepTime, cookTime, ingredients, createdAt, savedBy, userId, userDetails }) => {
	let clockStyle
	if ((prepTime + cookTime) < 30) {
		clockStyle = 'fill-green'
	} else if ((prepTime + cookTime) < 60) {
		clockStyle = 'fill-yellow'
	} else {
		clockStyle = 'fill-red'
	}
	const types = {}

	ingredients.forEach(x => {
		if (!types[x.type]) {
			types[x.type] = true
		}
	})

	return (
		<div className="post flex flex-between" key={_id}>
			<div className="post-image flex flex-center">
				{types.meat && <span>Meat</span>}
				<img src="http://localhost:4000/public/placeholder.png" alt="Placeholder" width="80" height="80"/>
			</div>
			<div className="post-content">
				<Link to={`/post/view/${_id}`}>
					<h3 className="post-title">{title}</h3>
				</Link>
				<p className="post-info flex med-gap">
					<Link to={`/user/${author.username}`} className="post-author">{author.username}</Link>
					<time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
				</p>
				<div className="width-100 flex flex-between flex-align-end">
					<span className="bold small-gap"><Clock className={clockStyle} width="20px" />{prepTime+cookTime} min</span>
					<SaveButton postId={_id} author={author} savedBy={savedBy} userId={userId} username={userDetails.username} />
				</div>
			</div>
			<div className="post-link flex flex-center">
				<Link to={`/post/view/${_id}`}><ArrowRight className="svg-30" /></Link>
			</div>
		</div>
	)
}

export default Post