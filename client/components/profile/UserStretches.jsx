import StretchCard from "@components/stretch/StretchCard"
import Spinner from '@components/ui/Spinner'

const UserStretches = ({ authUser, userStretches }) => {

    if (userStretches.length < 1) {
        return (
            <span className="block-center text-center">This user has not saved any stretches!</span>
        )
    } else {
        return (
            <>
                <p className="text-center">Total stretches saved: {userStretches.length}</p>
                {userStretches.length > 0 && (
                    <div className="profile-cards">
                        {userStretches.map(stretch => (
                            <StretchCard user={authUser} stretch={stretch} />
                        ))}
                    </div>
                )}
            </>
        )
    }
}

export default UserStretches