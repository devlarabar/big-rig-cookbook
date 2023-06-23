const Post = () => {
  return (
    <div className="post">
        <div class="postImage">
          <img src="https://insanelygoodrecipes.com/wp-content/uploads/2021/03/Homemade-Grilled-Cheese-Sandwich-with-Tomatoes.png" alt="sandwich"/>
        </div>
        <div className="postContent">
          <h2>Recipe Name</h2>
          <p className="postInfo">
            <a href="/" className="postAuthor">Author</a>
            <time>DateTime</time>
          </p>
          <p class="postSummary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
  )
}

export default Post