"use client"

import { useState } from 'react'
import Spinner from '@components/ui/Spinner'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const Remacc = () => {
    const auth = useAuthContext()
    const [doRedirect, setDoRedirect] = useState(false)

    const remacc = async () => {
        const response = await fetch(`/user/remacc`, {
            method: 'DELETE',
            body: JSON.stringify({ user: auth.user }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
        })
        if (response.ok) {
            signOut()
            setDoRedirect(true)

        }
    }

    if (doRedirect) return redirect('/')
    if (!auth?.checkAuth) return <Spinner />
    if (auth?.isAuthenticated() === "unauthenticated" || auth?.user === null) return redirect('/')

    return (
        <section className="w-full sm:w-3/4 max-w-[500px] flex flex-col gap-5">
            <h2 className="big-heading">Remove Account</h2>
            <p>If you wish to <strong>permanently and irreversibly</strong> remove your account, click the button below.</p>
            <button className="btn btn-error w-full" onClick={() => {
                const confirmation = confirm('This action is permanent!')
                if (confirmation) remacc()
            }}>Remove Account</button>
            <Link href="/profile/settings"><button className="btn btn-outline w-full">Back to Settings</button></Link>
        </section>
    )
}

export default Remacc