import Post from '../Post'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'

const IndexPage = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)
	const [ userDetails, setUserDetails ] = useState({})
	const [posts, setPosts] = useState([])

	useEffect(() => {
		(async function () {
			const userInfoResponse = await fetch('http://localhost:4000/profile', { credentials: 'include' })
			const userInfo = await userInfoResponse.json()
			setUserInfo(userInfo)
			if (userInfo?.id) {
				const userDataResponse = await fetch(`http://localhost:4000/getuserdata/${userInfo.id}`)
				const userDataInfo = await userDataResponse.json()
				console.log(userDataInfo)
				setUserDetails(userDataInfo)
			}
		}())
	}, [setUserInfo, setUserDetails])


	useEffect(() => {
		fetch('http://localhost:4000/viewposts').then(response => {
			response.json().then(posts => {
				setPosts(posts)
			})
		})
	}, [])

	const username = userInfo?.username

	return (
		<>
			{!username && <div>Welcome to Big Rig Cookbook! Please log in or create an account to get started.</div>}
			{username && posts.length > 0 && posts.map(post => (
				<Post {...post} key={post._id} userId={userInfo.id} userDetails={userDetails} />
			))}
		</>
	)
}

export default IndexPage