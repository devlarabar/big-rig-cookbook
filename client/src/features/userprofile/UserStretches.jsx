import Stretch from "../stretch/Stretch"

const UserStretches = ({ userStretches, authUser }) => {

    if (!userStretches) {
        return (
            <span className="block-center text-center">Loading...</span>
        )
    } else if (userStretches.length < 1) {
        return (
            <span className="block-center text-center">This user has not saved any stretches!</span>
        )
    } else {
        return (
            <>
                <p className="text-center">Total stretches saved: {userStretches.length}</p>
                {userStretches.length > 0 && userStretches.map(stretch => (
                    <Stretch stretch={stretch} key={stretch._id} authUser={authUser} />
                ))}
            </>
        )
    }
}

export default UserStretches