"use client"

import { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import { useAuthContext } from 'contexts/AuthContext'

function Register() {
    const auth = useAuthContext()
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [doRedirect, setDoRedirect] = useState(false)

    const register = () => {
        Axios({
            method: 'POST',
            data: {
                username: registerUsername,
                password: registerPassword,
                email: registerEmail,
            },
            withCredentials: true,
            url: '/server/auth/register',
        })
            .then(res => {
                console.log(res)
                setDoRedirect(true)
            })
            .catch(err => console.log(err))
    }

    const togglePwVisibility = (e) => setShowPassword(e.target.checked)

    if (doRedirect) {
        window.location = '/account/login'
    }

    if (auth?.user && auth.user !== "unauthenticated") return (
        <section className="text-center">
            Hello, {auth.user.username}! Looks like you're already signed in. <Link href="/home">Click here</Link> to go to the home page.
        </section>
    )
    return (
        <form className='flex flex-col gap-5 w-2/3 max-w-[300px]'>
            <h2>Register</h2>
            <label>Username
                <input
                    type="text"
                    placeholder='username'
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
            </label>
            <label>E-Mail
                <input
                    type="email"
                    placeholder='e-mail'
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
            </label>
            <label>Password
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
            </label>
            <label className="flex items-center gap-5">Show Password
                <input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => togglePwVisibility(e)} />
            </label>
            <button className='btn btn-secondary' onClick={register}>Submit</button>
            <p className="flex justify-center gap-1"><span>Already have an account? <Link href="/account/login">Sign in</Link>!</span></p>
        </form>
    )
}

export default Register;