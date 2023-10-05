"use client"

import { useState } from 'react'
import Axios from 'axios'
import Link from 'next/link'
import { useAuthContext } from 'contexts/AuthContext'
import Alert from '@/components/ui/Alert'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

function Register() {
    const auth = useAuthContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [question1, setQuestion1] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [question2, setQuestion2] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [doRedirect, setDoRedirect] = useState(false)

    const register = (e) => {
        e.preventDefault()
        Axios({
            method: 'POST',
            data: {
                username: username,
                password: password,
                question1: question1,
                answer1: answer1,
                question2: question2,
                answer2: answer2
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

    const checkUsername = async () => {
        const response = await fetch(`/server/auth/checkusername/${username}`)
        const info = await response.json()
        if (info.exists) setError('Username already exists.')
        else setError('')
    }

    const checkPasswordsMatch = () => {
        if (password !== password2) setError('Passwords do not match.')
        else setError('')
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
        <form className='flex flex-col gap-5 w-2/3 max-w-[350px]' onSubmit={(e) => register(e)}>
            <h2>Register</h2>

            {error && <Alert message={error} alertType="warning" />}

            <label>Username
                <input
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={checkUsername}
                />
            </label>
            <label>Password
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>Re-enter Password
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    onBlur={checkPasswordsMatch}
                />
            </label>
            <label className="flex items-center gap-5">Show Password
                <input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => togglePwVisibility(e)} />
            </label>
            <label>Security Question 1
                <input
                    type="text"
                    placeholder="What was your first pet's name?"
                    value={question1}
                    onChange={(e) => setQuestion1(e.target.value)}
                />
            </label>
            <label>Answer
                <input
                    type="text"
                    placeholder="Roger"
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
                />
            </label>
            <label>Security Question 2
                <input
                    type="text"
                    placeholder="In which city was your mother born?"
                    value={question2}
                    onChange={(e) => setQuestion2(e.target.value)}
                />
            </label>
            <label>Answer
                <input
                    type="text"
                    placeholder="New York City"
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
                />
            </label>
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-sm font-medium flex gap-5 items-center">
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                    <span>Why don't we ask for your email?</span>
                </div>
                <div className="collapse-content text-sm">
                    <p>We understand what it's like to constantly receive spam mail, and the worry that comes from providing your email to so many different applications. We don't actually <em>need</em> your email, so, we don't ask for it. Read our <Link href="/privacy">Privacy Policy</Link> for more information.</p>
                </div>
            </div>
            <button className='btn btn-secondary' type="submit">Submit</button>
            <p className="flex justify-center gap-1"><span>Already have an account? <Link href="/account/login">Sign in</Link>!</span></p>
        </form>
    )
}

export default Register;