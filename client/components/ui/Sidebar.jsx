"use client"

import Link from "next/link"
import Header from "./Header"
import Image from "next/image"
import { usePathname, redirect } from 'next/navigation'
import { useEffect, useState } from "react"
import { useAuthContext } from "@contexts/AuthContext"
import Spinner from '@components/ui/Spinner'

const Sidebar = ({ children }) => {
    const auth = useAuthContext()
    const pathname = usePathname()
    const [drawer, setDrawer] = useState("drawer")
    const [doRedirect, setDoRedirect] = useState(false)

    useEffect(() => {
        if (pathname !== "/" && !pathname.includes("account")) {
            setDrawer("drawer lg:drawer-open")
        }
        console.log(pathname)
    }, [pathname])

    const logOut = async (event) => {
        auth.logout()
        setDoRedirect(true)
    }

    if (doRedirect) {
        redirect('/')
    }

    return (
        <div className={drawer}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <main className="drawer-content flex flex-col items-center justify-between min-h-[100vh]">
                <Header />
                <div className="w-full flex-1 flex flex-col items-center justify-between lg:px-10">
                    {children}
                </div>
            </main>
            <aside className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <Link href="/home" className="max-[450px]:hidden">
                        <Image
                            src="/assets/images/brc-logo.svg"
                            alt="Logo"
                            className="object-contain"
                            width={300}
                            height={50}
                        />
                    </Link>
                    {auth?.user ? <>
                        <div className="avatar bg-transparent">
                            <div className="w-24 rounded-full ring ring-secondary ring-offset-2 mx-auto my-3 ring-offset-transparent">
                                <Image src={auth?.user.image || "/assets/images/grey.png"}
                                    width={100}
                                    height={100}
                                    alt="Profile"
                                />
                            </div>
                        </div>

                        <span className="mx-auto font-extrabold text-lg">Welcome, {auth.user.username}</span>
                        <hr className="my-6" />
                        <li>
                            <Link
                                href={`/profile/${auth.user.username}`}
                            >
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/recipes/create"
                            >
                                New Recipe
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/stretches"
                            >
                                Stretches
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/stretches/tracker"
                            >
                                Stretch Tracker
                            </Link>
                        </li>
                        <li>
                            {auth.user.admin && <Link
                                href="/adminuser"
                            >
                                Admin Tools
                            </Link>}
                        </li>
                    </>
                        : <div className="w-full p-6 flex justify-center items-center"><Spinner /></div>}
                    <li><label htmlFor="my-drawer-2" className="drawer-button lg:hidden">Close drawer</label></li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar