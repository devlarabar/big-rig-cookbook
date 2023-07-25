const UserAchievements = ({ userAchievements }) => {
    if (userAchievements.length === 0) {
        return (
            <span className="block-center text-center">This user has no achievements yet!</span>
        )
    }
    return (
        <div>
            {userAchievements.map(x => {
                return (
                    <>{x.name}</>
                )
            })}
        </div>
    )
}

export default UserAchievements