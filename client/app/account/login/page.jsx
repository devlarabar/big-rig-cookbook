"use client"

import { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import { useAuthContext } from 'contexts/AuthContext'
import { useRouter } from 'next/navigation'

function Authentication() {
    const auth = useAuthContext()
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)
    const [doRedirect, setDoRedirect] = useState(false)

    const login = (e) => {
        e.preventDefault()
        try {
            Axios({
                method: 'POST',
                data: {
                    username: loginUsername,
                    password: loginPassword,
                },
                withCredentials: true,
                url: '/server/auth/login',
            }).then((res) => {
                if (res.data === 'Successfully Authenticated') setDoRedirect(true)
                else setError(true)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const togglePwVisibility = (e) => setShowPassword(e.target.checked)

    if (doRedirect) {
        window.location = '/home'
    }

    if (auth?.user && auth.user !== "unauthenticated") return (
        <section className="text-center">
            Hello, {auth.user.username}! Looks like you're already signed in. <Link href="/home">Click here</Link> to go to the home page.
        </section>
    )
    return (
        <form onSubmit={(e) => login(e)} className="flex flex-col gap-5 w-2/3 max-w-[350px]">
            <h2>Login</h2>
            {error && <p className="text-error">Invalid credentials.</p>}
            <p className="center flex flex-col text-sm bg-base-200 p-4 rounded-xl">
                <span className="font-bold">Demo User:</span>
                <span>Username: demo</span>
                <span>Password: demo</span></p>
            <label>Username
                <input
                    type="text"
                    placeholder='username'
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
            </label>
            <label>Password
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </label>
            <label className="flex items-center gap-5">Show Password
                <input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => togglePwVisibility(e)} />
            </label>
            <button className='btn btn-secondary' type="submit">Submit</button>
            <p className="flex justify-center"><Link href="/account/forgot">Forgot your password?</Link></p>
            <hr />
            <p className="flex justify-center"><span>Don't have an account? <Link href="/account/register">Register</Link>!</span></p>
        </form>
    )
}

export default Authentication;