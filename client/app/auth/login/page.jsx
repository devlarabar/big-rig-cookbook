"use client"

import { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'

function Authentication() {
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

    return (
        <div className='App flex flex-col gap-5'>
            <h1>Login</h1>
            <div className='flex gap-5 w-full'>
                <input
                    placeholder='username'
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className='w-full rounded-md border border-gray-400 p-2'
                />
                <input
                    placeholder='password'
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className='w-full rounded-md border border-gray-400 p-2'
                />
                <button className='btn btn-secondary' onClick={login}>Submit</button>
            </div>

            <p className="flex justify-center gap-2">Don't have an account? <Link href="/auth/register">Register</Link> today!</p>
        </div>
    );
}

export default Authentication;