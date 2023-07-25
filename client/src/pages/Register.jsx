import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

	async function register(e) {
		// Prevent redirection
		e.preventDefault()

		// Send a request to the server containing user information
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' }
		})

		// Alert status (failed here is UN is not unique)
		if (response.status === 200) {
			alert('Registration successful')
            setRedirect(true)
		} else {
			alert('Registration failed')
		}
	}
	
	// If redirect state is true (^^^), redirect to home page
    if (redirect) {
        return <Navigate to={'/login'} />
    }

	return (
		<div>
			<form onSubmit={register} className="login">
				<h2>Register</h2>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type="email"
					placeholder="email"
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	)
}

export default Register