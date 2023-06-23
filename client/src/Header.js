import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Header = () => {
  const [ username, setUsername ] = useState('')
  useEffect (() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(userInfo => {
        setUsername(userInfo.username)
      })
    })
  }, [])

  function logout(e) {
    e.preventDefault()
    fetch('http://localhost:4000/logout', {
      method: 'post',
      credentials: 'include'
    })
    setUsername(null)
  }

  return (
    <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
          {username && (
            <>
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