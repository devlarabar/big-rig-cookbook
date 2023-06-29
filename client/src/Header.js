import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { UserContext } from './UserContext'

const Header = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)

	useEffect(() => {
		fetch('http://localhost:4000/profile', {
			credentials: 'include'
		}).then(res => {
			res.json().then(userInfo => {
				setUserInfo(userInfo)
			})
		})
	}, [])

	function logout(e) {
		//e.preventDefault()
		fetch('http://localhost:4000/logout', {
			method: 'post',
			credentials: 'include'
		})
		setUserInfo(null)
	}

	const username = userInfo?.username

	return (
		<header>
			<Link to="/" className="logo">Big Rig Cookbook</Link>
			<nav>
				{username && (
					<>
						<Link to={`/user/${username}`} alt="Profile"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
						</svg>
						</Link>
						<Link to='/create'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						</Link>
						<a href="/" alt="Logout" onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
						</svg>
						</a>
					</>
				)}
				{!username && (
					<>
						<Link to="/login" alt="Login"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
						</svg>
						</Link>
						<Link to="/register" alt="Register"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
						</svg>
						</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Header