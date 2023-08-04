import Post from '../recipes/view/Post'

const UserRecipes = ({ userId, userDetails, userRecipes }) => {
    if (!userRecipes) {
        return (
            <span className="block-center text-center">Loading...</span>
        )
    } else if (userRecipes.length < 1) {
        return (
            <span className="block-center text-center">This user has not created any recipes!</span>
        )
    } else {
        return (
            <>
                <p className="text-center">Total recipes created: {userRecipes.length}</p>
                {userRecipes.length > 0 && userRecipes.map(post => (
                    <Post {...post} key={post._id} userId={userId} userDetails={userDetails} />
                ))}
            </>
        )
    }
}

export default UserRecipes