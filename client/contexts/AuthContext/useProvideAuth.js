"use client"

import { useState, useEffect } from 'react'

const useProvideAuth = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/getuser`, {
				method: 'GET',
				credentials: 'include'
			})
			try {
				const userData = await response.json()
				if (process.env.NEXT_PUBLIC_ENV === 'local') console.log('Current user:', userData)
				setUser(userData)
			} catch (err) {
				// No user
				setUser(null)
			}
			if (response instanceof Object) {
				// To-do: put redirect logic here
			}
		}
		fetchCurrentUser()
	}, [])

	const logout = async () => {
		console.log('Logging out...')
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		})
		if (response.ok) {
			setUser(null)
		}
	}

	const isAuthenticated = () => user ? true : 'unauthenticated'

	return {
		user,
		logout,
		isAuthenticated,
	}
}

export default useProvideAuth
