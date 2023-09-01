import RecipeCard from '@components/recipe/RecipeCard'
import Spinner from '@components/ui/Spinner'

const UserRecipes = ({ authUser, userRecipes }) => {
    if (userRecipes.length < 1) {
        return (
            <span className="block-center text-center">This user has not created any recipes!</span>
        )
    } else {
        return (
            <>
                <p className="text-center">Total recipes created: {userRecipes.length}</p>
                {userRecipes.length > 0 && (
                    <div className="profile-cards">
                        {userRecipes.map((recipe, index) =>
                            <RecipeCard user={authUser} recipe={recipe} key={index} />
                        )}
                    </div>
                )}
            </>
        )
    }
}

export default UserRecipes