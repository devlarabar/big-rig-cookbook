import axios from 'axios'

const URL = axios.create({
	withCredentials: true,
})

class DataService {
	getCurrentUser() {
		return URL.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/getuser`)
	}
	logout() {
		console.log('Logging out...')
		return URL.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
	}
}

const dataService = new DataService()
export default dataService
