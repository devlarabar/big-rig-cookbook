import { Outlet } from 'react-router-dom'
import PageNav from './PageNav'
import SubNavigation from './SubNavigation'

const Layout = () => {
	return (
		<>
			<PageNav />
			<main>
				<SubNavigation />
				<Outlet />
			</main>
		</>
	)
}

export default Layout