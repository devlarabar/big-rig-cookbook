import React from 'react'

const UserBadges = ({ userAchievements }) => {
    if (userAchievements.length === 0) {
        return (
            <></>
        )
    }
    return (
        <div className="user-badges flex flex-center">
            {userAchievements.map((x, i) => {
                return (
                    <div className="user-badge" key={i}>{x.name}</div>
                )
            })}
        </div>
    )
}

export default UserBadges