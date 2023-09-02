"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'

import { useAuthContext } from "@contexts/AuthContext"

const Header = () => {
    const auth = useAuthContext()
    const [doRedirect, setDoRedirect] = useState(false)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    const logoLink = auth?.user ? '/home' : '/'

    useEffect(() => console.log(auth), [])

    const logOut = async (event) => {
        auth.logout()
        setDoRedirect(true)
    }

    if (doRedirect) {
        redirect('/')
    }

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={logoLink} className="max-[450px]:hidden">
                <Image
                    src="/assets/images/brc-logo.svg"
                    alt="Logo"
                    className="object-contain"
                    width={300}
                    height={50}
                />
            </Link>
            <Link href={logoLink} className="hidden max-[450px]:block">
                <Image
                    src="/assets/images/brc-logo-small.svg"
                    alt="Logo"
                    className="object-contain"
                    width={50}
                    height={50}
                />
            </Link>

            <div className="sm:flex hidden">
                {auth?.user ? (
                    <div className="flex gap-3 md:gap-5 flex-center">
                        <Link href="/recipe/create" className="btn btn-primary">New Recipe</Link>
                        <button type="button" onClick={logOut} className="btn btn-outline">Sign out</button>

                        <Link href={`/profile/${auth.user.username}`}>
                            <Image src={auth?.user.image || "/assets/images/grey.png"}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="Profile"
                            />
                        </Link>
                    </div>
                )
                    : <>
                        <Link href="/auth/login">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                Sign In
                            </button>
                        </Link>
                    </>
                }
            </div>

            <div className="sm:hidden flex relative">
                {auth?.user ? (
                    <div className="flex">
                        <Image src={auth?.user.image || "/assets/images/grey.png"}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown z-10">
                                <Link
                                    href={`/profile/${auth.user.username}`}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/stretch/search"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Search Recipes
                                </Link>
                                <Link
                                    href="/recipe/create"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    New Recipe
                                </Link>
                                <Link
                                    href="/stretch"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Stretches
                                </Link>
                                <Link
                                    href="/stretch/tracker"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Stretch Tracker
                                </Link>
                                {auth.user.admin && <Link
                                    href="/admin"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Admin Tools
                                </Link>}
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        setToggleDropdown(false)
                                        logOut(event)
                                    }}
                                    className="mt-2 w-full btn btn-sm"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : <>
                    <Link href="/auth/login">
                        <button
                            type="button"
                            className="btn btn-primary"
                        >
                            Sign In
                        </button>
                    </Link>
                </>
                }
            </div>
        </nav>
    )
}

export default Header