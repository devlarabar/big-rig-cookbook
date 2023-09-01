"use client"

import { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import { useAuthContext } from 'contexts/AuthContext'

function Authentication() {
    const auth = useAuthContext()
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [doRedirect, setDoRedirect] = useState(false)

    const login = () => {
        Axios({
            method: 'POST',
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        }).then((res) => {
            console.log(res)
            setDoRedirect(true)
        })
    }

    if (doRedirect) {
        window.location = '/home'
    }

    if (auth?.user && auth.user !== "unauthenticated") return (
        <section className="text-center">
            Hello, {auth.user.username}! Looks like you're already signed in. <Link href="/home">Click here</Link> to go to the home page.
        </section>
    )
    return (
        <form className='flex flex-col gap-5 w-2/3 max-w-[300px]'>
            <h2>Login</h2>
            <label>Username
                <input
                    placeholder='username'
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
            </label>
            <label>Password
                <input
                    placeholder='password'
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </label>
            <button className='btn btn-secondary' onClick={login}>Submit</button>
            <p className="flex justify-center gap-1">Don't have an account? <Link href="/auth/register">Register</Link> today!</p>
        </form>
    )
}

export default Authentication;