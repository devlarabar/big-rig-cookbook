import Post from '../recipes/view/Post'

const UserCookbook = ({ userCookbook, authUser }) => {

    if (!userCookbook) {
        return (
            <span className="block-center text-center">Loading...</span>
        )
    } else if (userCookbook.length < 1) {
        return (
            <span className="block-center text-center">This user has no recipes in their cookbook!</span>
        )
    } else {
        return (
            <>
                <p className="text-center">Total recipes saved: {userCookbook.length}</p>
                {userCookbook.length > 0 && userCookbook.map(post => (
                    <Post {...post} key={post._id} userId={authUser.id} />
                ))}
            </>
        )
    }
}

export default UserCookbook