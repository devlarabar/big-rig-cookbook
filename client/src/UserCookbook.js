import Post from './Post'

const UserCookbook = ({ user, userCookbook, userId, userDetails }) => {
    // user: the user whose profile you are viewing;    userId/userDetails: the user who is logged in

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
                <p className="text-center">Total recipes saved: (total here)</p>
                {userCookbook.length > 0 && userCookbook.map(post => (
                    <Post {...post} key={post._id} userId={userId} userDetails={userDetails} />
                ))}
            </>
        )
    }
}

export default UserCookbook