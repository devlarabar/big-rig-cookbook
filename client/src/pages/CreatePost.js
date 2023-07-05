import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor'
import AddIngredients from '../AddIngredients'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const [ ingList, setIngList ] = useState([{ ingredientName: '', ingredientQty: '' }]);

    

    // Form submit: Add post to the DB    
    async function createNewPost(e) {
        e.preventDefault()

        // const data = new FormData()
        // data.set('title', title)
        // data.set('summary', summary)
        // data.set('content', content)
        // data.set('file', files[0])

        const postData = {
            title,
            summary,
            content,
            ingredients: ingList[0].ingredientName ? ingList : [],
            file: files[0]
        }

        // IMPORTANT NOTE: File upload not working; either remove entirely or fix

        const response = await fetch('http://localhost:4000/createpost', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (response.ok) {
            setRedirect(true)
        }
    }
    
    if (redirect) {
        return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={createNewPost}>
        <h2>Create a Recipe</h2>
        <h3>Title & Summary</h3>
        <input 
            type="title" 
            placeholder={'Title'} 
            value={title} 
            onChange={e => setTitle(e.target.value)}
        />
        <input 
            type="summary" 
            placeholder={'Summary'} 
            value={summary} 
            onChange={e => setSummary(e.target.value)}
        />
        <AddIngredients ingList={ingList} setIngList={setIngList}/>
        <h3>Image</h3>
        <input type="file"
            onChange={e => setFiles(e.target.files)} 
        />
        <h3>Directions</h3>
        <Editor onChange={setContent} value={content} />
        <button type="submit" style={{marginTop:'5px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost