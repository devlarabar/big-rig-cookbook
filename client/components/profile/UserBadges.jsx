import { CheckBadgeIcon } from "@heroicons/react/24/solid"

const UserBadges = ({ userAchievements }) => {
    if (userAchievements.length === 0) return <></>
    return (
        <div className="mt-4">
            {userAchievements.map((x, i) => {
                return x?.achievement?.name ? (
                    <div
                        className="badge badge-md flex items-center gap-1"
                        key={i}
                    >
                        <CheckBadgeIcon className="w-4 h-4" />
                        {x.achievement.name}
                    </div>
                ) : <span key={i}></span>
            })}
        </div>
    )
}

export default UserBadges