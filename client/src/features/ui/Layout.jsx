import Header from './Header'
import { Outlet } from 'react-router-dom'
import PageNav from './PageNav'

const Layout = () => {
	return (
		<>
		<PageNav />
		<main>
			
			<Outlet />
		</main>
		</>
	)
}

export default Layout