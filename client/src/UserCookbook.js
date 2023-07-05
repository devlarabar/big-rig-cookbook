import Post from './Post'

const UserCookbook = ({ user, userId, userDetails }) => {
    // user: the user whose profile you are viewing;    userId/userDetails: the user who is logged in

    const savedPosts = user.savedPosts

    if (savedPosts.length < 1) {
        return (
            <span className="block-center text-center">Loading...</span>
        )
    } else {

        return (
            <>
                <p className="text-center">Total recipes saved: (total here)</p>
                {savedPosts.length > 0 && savedPosts.map(post => (
                    <Post {...post} key={post._id} userId={userId} userDetails={userDetails} />
                ))}
            </>
        )
    }
}

export default UserCookbook