import { Link } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../users/UserContext'
import { ReactComponent as Profile } from '../../assets/navigation/heroicon-profile.svg'
import { ReactComponent as Create } from '../../assets/navigation/heroicon-add.svg'
import { ReactComponent as Logout } from '../../assets/navigation/heroicon-logout.svg'
import { ReactComponent as Login } from '../../assets/navigation/heroicon-login.svg'
import { ReactComponent as Register } from '../../assets/navigation/heroicon-register.svg'
import { ReactComponent as StretchSvg } from '../../assets/navigation/heroicon-health.svg'
import { ReactComponent as Burger } from '../../assets/navigation/heroicon-burger.svg'

const Header = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)
    const [navExpanded, setNavExpanded] = useState(false)

	const TESTING = false

	useEffect(() => {
		fetch('http://localhost:4000/user/profile', {
			credentials: 'include'
		}).then(res => {
			res.json().then(userInfo => {
				setUserInfo(userInfo)
			})
		})
	}, [setUserInfo])

	function logout(e) {
		//e.preventDefault()
		fetch('http://localhost:4000/logout', {
			method: 'post',
			credentials: 'include'
		})
		setUserInfo(null)
	}

    function expandNav() {
        if (navExpanded) setNavExpanded(false)
        else setNavExpanded(true)
    }

	const username = userInfo?.username

	return (
			<nav className={navExpanded ? 'nav-expanded' : 'nav-collapsed' }>
                <Burger className='nav-burger' onClick={expandNav} />
				{username && (
					<>
						<Link to={`/user/${username}`} alt="Profile">
							<Profile />
						</Link>
						{TESTING && <Link to={`/user/test`} alt="Profile">Test</Link>}
						<Link to='/create'>
							<Create />
						</Link>
						<Link to='/stretch' alt="Stretch">
							<StretchSvg />
						</Link>
						<a href="/" alt="Logout" onClick={logout}>
							<Logout />
						</a>
					</>
				)}
				{!username && (
					<>
						<Link to="/login" alt="Login">
							<Login />
						</Link>
						<Link to="/register" alt="Register">
							<Register />
						</Link>
					</>
				)}
			</nav>
	)
}

export default Header