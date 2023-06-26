import { format } from 'date-fns'
const Post = ({title, summary, cover, content, createdAt}) => {
  return (
    <div className="post">
        <div className="postImage">
          <img src="https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Homemade-Grilled-Cheese-Sandwich-with-Tomatoes.png" alt="sandwich"/>
        </div>
        <div className="postContent">
          <h2>{title}</h2>
          <p className="postInfo">
            <a href="/" className="postAuthor">Author</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="postSummary">{summary}
          </p>
        </div>
      </div>
  )
}

export default Post