import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../features/users/UserContext'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)
	const { setUserInfo } = useContext(UserContext)

	async function login(e) {
		e.preventDefault()
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
		// If the response is 200 (correct credentials)
		if (response.ok) {
			response.json().then(userInfo => {
				setUserInfo(userInfo)
				setRedirect(true)
			})
		} else {
			alert('Wrong credentials')
		}
	}

	// If redirect state is true (^^^), redirect to home page
	if (redirect) {
		return <Navigate to={'/'} />
	}

	return (
		<div>
			<form onSubmit={login} className="login">
				<h2>Login</h2>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login