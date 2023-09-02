const UserBadges = ({ userAchievements }) => {
    if (userAchievements.length === 0) return <></>
    return (
        <div className="mt-4">
            {userAchievements.map((x, i) => {
                return x?.achievement?.name ? (
                    <div 
                        className="badge badge-md"
                        key={i}
                    >
                        {x.achievement.name}
                    </div>
                ) : <span key={i}></span>
            })}
        </div>
    )
}

export default UserBadges