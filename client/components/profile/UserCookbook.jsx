import RecipeCard from '@components/recipe/RecipeCard'
import Spinner from '@components/ui/Spinner'

const UserCookbook = ({ authUser, userCookbook }) => {

    if (userCookbook.length < 1) {
        return (
            <span className="block-center text-center">This user has no recipes in their cookbook!</span>
        )
    } else {
        return (
            <>
                <p className="text-center">Total recipes saved: {userCookbook.length}</p>
                {userCookbook.length > 0 && (
                    <div className="profile-cards">
                        {userCookbook.map((recipe, index) => (
                            <RecipeCard user={authUser} recipe={recipe} key={index} />
                        ))}
                    </div>
                )}
            </>
        )
    }
}

export default UserCookbook