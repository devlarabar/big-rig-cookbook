"use client"

import { useAuthContext } from 'contexts/AuthContext'
import Spinner from '@components/ui/Spinner'
import ProfileDescription from '@components/settings/ProfileDescription'

const ProfileSettings = () => {
    const auth = useAuthContext()
    
    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <div>
            <h2 className="big-heading">Profile Settings</h2>
            <ProfileDescription user={auth.user}/>
        </div>
    )
}

export default ProfileSettings