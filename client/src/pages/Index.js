import Post from '../Post'
import { useState, useEffect } from 'react'

const IndexPage = () => {
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/viewposts').then(response => {
      response.json().then(posts => {
        setPosts(posts)
      })
    })
  }, [])

  return (
    <>
        { posts.length > 0 && posts.map(post => (
          <Post {... post}/>
        ))}
    </>
  )
}

export default IndexPage