import Header from './Header'
import { Outlet } from 'react-router-dom'
import PageNav from './PageNav'

const Layout = () => {
	return (
		<main>
			<Header />
			<PageNav />
			<Outlet />
		</main>
	)
}

export default Layout