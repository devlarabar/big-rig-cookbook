import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({_id, title, summary, cover, content, author, createdAt}) => {
  return (
    <div className="post">
        <div className="postImage">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt="sandwich"/>
          </Link>
        </div>
        <div className="postContent">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="postInfo">
            <a href="/" className="postAuthor">{author.username}</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="postSummary">{summary}
          </p>
        </div>
      </div>
  )
}

export default Post