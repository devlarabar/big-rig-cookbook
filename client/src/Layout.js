import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
        <Header />
        <Outlet />
    </main>
  )
}

export default Layout