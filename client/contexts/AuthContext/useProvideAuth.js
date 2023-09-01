"use client"

import { useState, useEffect } from 'react'
import DataService from '@services/dataService'

const useProvideAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if there's a current user; if so, save them to the auth context
		DataService.getCurrentUser().then(response => {
			console.log('Current user:', response.data)
			setUser(response.data)
			if (response.data instanceof Object) {
				// To-do: put redirect logic here
			}
		})
	}, [])

	const logout = () => {
		DataService.logout()
		setUser(null)
	}

	const isAuthenticated = () => user ? true : 'unauthenticated'

	return {
		user,
		logout,
		isAuthenticated,
	}
}

export default useProvideAuth
