const UserAchievements = ({ userAchievements }) => {
    if (userAchievements.length === 0) {
        return (
            <span className="block-center text-center">This user has no achievements yet!</span>
        )
    }
    return (
        <div>
            {userAchievements.map((x, i) => {
                return (
                    <span key={i}>{x.name}</span>
                )
            })}
        </div>
    )
}

export default UserAchievements