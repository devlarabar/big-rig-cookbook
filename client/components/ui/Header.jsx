"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { useAuthContext } from "@contexts/AuthContext"

const Header = () => {
    const auth = useAuthContext()
    const [doRedirect, setDoRedirect] = useState(false)
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const dropdown = useRef(null)

    const logoLink = auth?.user ? '/home' : '/'

    const closeOpenMenus = (e) => {
        if (dropdown.current && toggleDropdown && !dropdown.current.contains(e.target)) {
            setToggleDropdown(false)
        }
    }
    if(typeof window !== 'undefined') {
        document.addEventListener('mousedown', closeOpenMenus)
    }
    
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

            <div className="flex relative">
                {auth?.user ? (
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-1 w-fit">
                            {/* <ChevronDownIcon width={18} className="hover:cursor-pointer dropdown-trigger" 
                                onClick={() => setToggleDropdown((prev) => !prev)} /> */}
                            <Image src={auth?.user.image || "/assets/images/grey.png"}
                                width={37}
                                height={37}
                                className="rounded-full hover:cursor-pointer hover:outline-2 hover:outline-current dropdown-trigger"
                                alt="Profile"
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />
                        </div>

                        {toggleDropdown && (
                            <div className="dropdown z-10" ref={dropdown}>
                                <Link
                                    href={`/profile/${auth.user.username}`}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/stretches/search"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Search Recipes
                                </Link>
                                <Link
                                    href="/recipes/create"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    New Recipe
                                </Link>
                                <Link
                                    href="/stretches"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Stretches
                                </Link>
                                <Link
                                    href="/stretches/tracker"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Stretch Tracker
                                </Link>
                                {auth.user.admin && <Link
                                    href="/adminuser"
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
                    <Link href="/account/login">
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