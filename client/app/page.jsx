"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useAuthContext } from '@contexts/AuthContext'
import { redirect } from 'next/navigation'

const Home = () => {
    const auth = useAuthContext()

    //if (auth?.user) return redirect('/home')

    return (
        <section>
            <section className="w-full flex-center flex-col">
                <h1 className="header_text text-center">Big Rig Cookbook:
                    <br className="max-md:hidden" />
                    <span className="header_gradient text-center"> Take Charge of Your Health</span></h1>
                <Image
                    src={"/assets/images/semi-truck.svg"}
                    width={200}
                    height={200}
                    className="mt-5"
                    alt="Truck"
                />
                <p className="desc text-center mt-5 max-w-[640px]">
                    Join your fellow truckers in improving your health and wellness on the road! Share your unique and creative <em>big rig recipes</em> with other drivers, save stretch routines, and earn achievements by maintaining healthy habits.
                </p>
                {auth?.user ? <Link href="/home" className="mx-auto mt-6">
                    <button
                        type="button"
                        className="btn btn-primary w-48"
                    >
                        Get started!
                    </button>
                </Link> : <Link href="/account/login" className="mx-auto mt-6">
                    <button
                        type="button"
                        className="btn btn-primary w-48"
                    >
                        Sign In
                    </button>
                </Link>
                }

            </section>
        </section>
    )
}

export default Home