import { Link } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { UserContext } from './UserContext'

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext)

  useEffect (() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout(e) {
    //e.preventDefault()
    fetch('http://localhost:4000/logout', {
      method: 'post',
      credentials: 'include'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
        <Link to="/" className="logo">Big Rig Cookbook</Link>
        <nav>
          {username && (
            <>
              <span>Hello, {username}</span>
              <Link to='/create'>Create Post</Link>
              <a href="/" onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header