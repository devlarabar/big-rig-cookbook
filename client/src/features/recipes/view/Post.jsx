import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import SaveButton from '../../ui/SaveButton'

// Import SVGs
import { ReactComponent as Clock } from '../../../assets/fa-clock-solid.svg'
import { ReactComponent as ArrowRight } from '../../../assets/heroicon-arrow-right.svg'
import { IngredientIcons } from './IngredientIcons'


const Post = ({ _id, title, author, prepTime, cookTime, ingredients, createdAt, savedBy, userId }) => {
	let clockStyle
	if ((prepTime + cookTime) < 30) {
		clockStyle = 'fill-green'
	} else if ((prepTime + cookTime) < 60) {
		clockStyle = 'fill-yellow'
	} else {
		clockStyle = 'fill-red'
	}

	return (
		<div className="post flex flex-between" key={_id}>
			{/* <div className="post-image flex flex-center">
				
			</div> */}
			<div className="post-content flex flex-column med-gap">
				<Link to={`/post/view/${_id}`}>
					<h3 className="post-title">{title}</h3>
				</Link>
				<div className="post-info flex flex-between med-gap">
					<span className="flex med-gap"><Link to={`/user/${author.username}`} className="post-author">{author.username}</Link>
					<time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time></span>
				</div>
				<IngredientIcons ingredients={ingredients} />
				<div className="width-100 flex flex-between flex-align-end">
					<span className="bold flex med-gap"><Clock className={clockStyle} width="20px" /><span>{prepTime+cookTime} min</span></span>
					<SaveButton postId={_id} author={author} savedBy={savedBy} userId={userId} />
				</div>
			</div>
			<div className="post-link flex flex-center">
				<Link to={`/post/view/${_id}`}><ArrowRight className="svg-30" /></Link>
			</div>
		</div>
	)
}

export default Post