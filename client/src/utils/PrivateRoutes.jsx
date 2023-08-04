import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Spinner from '../features/ui/Spinner'

const PrivateRoutes = () => {
    const [authUser, setAuthUser] = useState(undefined)

    useEffect(() => {
        (async function () {
            const authUserResponse = await fetch('http://localhost:4000/user/profile', { credentials: 'include' })
            const authUser = await authUserResponse.json()
            setAuthUser(authUser)
        }())
    }, [setAuthUser])

    if (authUser === undefined) {
        return <Spinner />
    }
    return (
        authUser?.id ? <Outlet context={{ authUser }} /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes