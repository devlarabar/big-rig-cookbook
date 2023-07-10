import './App.css'
import Layout from './Layout'
import IndexPage from './pages/Index'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import UserProfile from './pages/UserProfile'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext'

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path={'/login'} element={<Login />} />
					<Route path={'/register'} element={<Register />} />
					<Route path={'/create'} element={<CreatePost />} />
					<Route path={'/post/:id'} element={<PostPage />} />
					<Route path={'/editpost/:id'} element={<EditPost />} />
					<Route path={'/user/:user'} element={<UserProfile />} />
				</Route>
			</Routes>
		</UserContextProvider>


	);
}

export default App;
