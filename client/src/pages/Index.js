import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import Posts from '../Posts'

const IndexPage = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)
	const [userDetails, setUserDetails] = useState({})

	useEffect(() => {
		(async function () {
			const userInfoResponse = await fetch('http://localhost:4000/profile', { credentials: 'include' })
			const userInfo = await userInfoResponse.json()
			setUserInfo(userInfo)
			if (userInfo?.id) {
				const userDataResponse = await fetch(`http://localhost:4000/user/getuserdata/${userInfo.id}`)
				const userDataInfo = await userDataResponse.json()
				console.log(userDataInfo)
				setUserDetails(userDataInfo)
			}
		}())
	}, [setUserInfo, setUserDetails])

	const username = userInfo?.username

	return (
		<>
			{!username && <div>Welcome to Big Rig Cookbook! Please log in or create an account to get started.</div>}
			{username && <Posts userDetails={userDetails} setUserDetails={setUserDetails} userInfo={userInfo} />}
		</>
	)
}

export default IndexPage