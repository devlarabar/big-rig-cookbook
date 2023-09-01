"use client"

import { useState } from 'react'
import Axios from 'axios'

function Register() {
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
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
            url: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        })
            .then(res => {
                console.log(res)
                setDoRedirect(true)
            })
            .catch(err => console.log(err))
    }

    if (doRedirect) {
        window.location = 'auth/login'
    }

    return (
        <div className='App flex flex-col gap-5'>
            <h1>Register</h1>
            <div className='flex gap-5 w-full'>
                <input
                    placeholder='username'
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    className='w-full rounded-md border border-gray-400 p-2'
                />
                <input
                    placeholder='email'
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className='w-full rounded-md border border-gray-400 p-2'
                />
                <input
                    placeholder='password'
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className='w-full rounded-md border border-gray-400 p-2'
                />
                <button className='btn btn-secondary' onClick={register}>Submit</button>
            </div>
        </div>
    );
}

export default Register;