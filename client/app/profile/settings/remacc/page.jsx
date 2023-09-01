"use client"

import { useState } from 'react'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'

const Remacc = () => {
    const auth = useAuthContext()
    const [doRedirect, setDoRedirect] = useState(false)

    const remacc = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/remacc`, {
            method: 'DELETE',
            body: JSON.stringify({ user: auth.user }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            signOut()
            setDoRedirect(true)

        }
    }

    if (doRedirect) return redirect('/')
    if (!auth?.user) return <Spinner />
    if (auth?.user === "unauthenticated") return redirect('/')

    return (
        <div>
            <button className="btn btn-primary" onClick={() => {
                const confirmation = confirm('This action is permanent!')
                if (confirmation) remacc()
            }}>Remove Account</button>
        </div>
    )
}

export default Remacc