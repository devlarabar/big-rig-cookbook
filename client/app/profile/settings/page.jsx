"use client"

import { useAuthContext } from 'contexts/AuthContext'
import Spinner from '@components/ui/Spinner'
import ProfileDescription from '@components/settings/ProfileDescription'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const ProfileSettings = () => {
    const auth = useAuthContext()

    if (!auth?.checkAuth) return <Spinner />
    if (auth?.isAuthenticated() === "unauthenticated" || auth?.user === null) return redirect('/')

    return (
        <section className="w-full sm:w-3/4 max-w-[500px]">
            <h2 className="big-heading">Profile Settings</h2>
            <ProfileDescription user={auth.user} />
            <hr className="divider" />
            <Link href="/profile/settings/remacc"><button className="btn btn-error">Remove Account</button></Link>
        </section>
    )
}

export default ProfileSettings