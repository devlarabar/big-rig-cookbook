import './App.css'
import Layout from './features/ui/Layout'
import IndexPage from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import UserProfile from './pages/UserProfile'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './features/users/UserContext'
import NotFound from './pages/NotFound'
import AdminView from './pages/AdminView'
import SearchResults from './pages/SearchResults'
import StretchIndex from './pages/StretchIndex'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path={'/login'} element={<Login />} />
					<Route path={'/register'} element={<Register />} />
					<Route element={<PrivateRoutes />}>
						<Route path={'/create'} element={<CreatePost />} />
						<Route path={'/post/view/:id'} element={<PostPage />} />
						<Route path={'/editpost/:id'} element={<EditPost />} />
						<Route path={'/user/:user'} element={<UserProfile />} />
						<Route path={'/search/results/:query'} element={<SearchResults />} />
						<Route path={'/stretch'} element={<StretchIndex />} />
						<Route path={'/admin/dashboard'} element={<AdminView />} />
					</Route>
					
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</UserContextProvider>


	);
}

export default App;
