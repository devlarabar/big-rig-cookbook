"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useAuthContext } from 'contexts/AuthContext'
import Alert from '@/components/ui/Alert'

function ForgotPassword() {
    const auth = useAuthContext()
    const [username, setUsername] = useState('')
    const [questions, setQuestions] = useState(null)
    const [answers, setAnswers] = useState({})
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false)
    const [doRedirect, setDoRedirect] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [success, setSuccess] = useState(false)

    const getSecurityQuestions = async (e) => {
        e.preventDefault()
        const response = await fetch(`/server/auth/getquestions/${username}`)
        const info = await response.json()
        if (!info.userExists) {
            setError('User does not exist.')
            setQuestions(null)
            setValidated(false)
        }
        else {
            setError('')
            setQuestions(info.questions)
            setValidated(false)
        }
    }

    const validateQuestions = async (e) => {
        e.preventDefault()
        const response = await fetch(`/server/auth/validatequestions/${username}`, {
            method: 'POST',
            body: JSON.stringify({ answers }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
        })
        const info = await response.json()
        if (info.validated) {
            setValidated(true)
            setError('')
        }
        else {
            setValidated(false)
            setError('Incorrect responses.')
        }
    }

    const setNewPassword = async (e) => {
        e.preventDefault()
        const response = await fetch(`/server/auth/changepassword/${username}`, {
            method: 'POST',
            body: JSON.stringify({ password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
        })
        const info = await response.json()
        if (info.success) setSuccess(true)
        else setSuccess(false)
    }

    const togglePwVisibility = (e) => setShowPassword(e.target.checked)

    if (doRedirect) window.location = '/home'

    if (auth?.user && auth.user !== "unauthenticated") return (
        <section className="text-center">
            Hello, {auth.user.username}! Looks like you're already signed in. <Link href="/home">Click here</Link> to go to the home page.
        </section>
    )
    return (
        <section className="w-full flex flex-col justify-center items-center gap-5">
            <h2>Forgot Password</h2>
            <aside className="w-2/3 max-w-[350px]">
                {error && <Alert message={error} alertType="error" />}
            </aside>
            {!validated &&
                <form onSubmit={(e) => getSecurityQuestions(e)} className="flex flex-col gap-5 w-2/3 max-w-[350px]">
                    <label>Username
                        <input
                            type="text"
                            placeholder='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <button className='btn btn-secondary' type="submit">Find User</button>
                </form>
            }

            {questions && !validated &&
                <form onSubmit={(e) => validateQuestions(e)} className="flex flex-col gap-5 w-2/3 max-w-[350px]">
                    <hr />
                    <span>Please answer your security questions below in order to reset your password.</span>
                    {questions.length >= 1 ? <>
                        {questions.map((question, index) => {
                            return (
                                <label key={index}>{question.question}
                                    <input
                                        type="text"
                                        placeholder={`Answer ${index + 1}`}
                                        onChange={(e) => setAnswers({ ...answers, [`a${index}`]: e.target.value })}
                                    />
                                </label>
                            )
                        })}
                        <button className='btn btn-primary' type="submit">Validate</button>
                    </>
                        : <p className="text-error">You have not set any security questions.</p>}
                </form>
            }

            {questions && validated &&
                <section className="w-full flex justify-center">
                    {success
                        ? <section className="flex flex-col justify-center items-center gap-4">
                            <Alert message="You have successfully changed your password." alertType="success" />
                            <p>Click <Link href="/account/login">here</Link> to sign in.</p>
                        </section>
                        : <form onSubmit={(e) => setNewPassword(e)} className="flex flex-col gap-5 w-2/3 max-w-[350px]">

                            <label>Enter a new password
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="New password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <label className="flex items-center gap-5">Show Password
                                <input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => togglePwVisibility(e)} />
                            </label>
                            <button className='btn btn-primary' type="submit">Change Password</button>
                        </form>
                    }
                </section>}
            {!success &&
                <p className="flex justify-center">
                    <span>Remembered your password? <Link href="/account/register">Sign in</Link>!</span>
                </p>
            }
        </section>
    )
}

export default ForgotPassword