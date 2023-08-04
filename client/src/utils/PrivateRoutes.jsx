import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Spinner from '../features/ui/Spinner'

const PrivateRoutes = () => {
    const [userInfo, setUserInfo] = useState(undefined)
    
    useEffect(() => {
		(async function () {
			const userInfoResponse = await fetch('http://localhost:4000/user/profile', { credentials: 'include' })
			const userInfo = await userInfoResponse.json()
			setUserInfo(userInfo)
		}())
	}, [setUserInfo])
    
    if (userInfo === undefined) {
        return <Spinner />
    }
    return (
        userInfo?.id ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes