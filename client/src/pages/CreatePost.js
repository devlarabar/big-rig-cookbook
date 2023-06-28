import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const [ ingList, setIngList ] = useState([{ ingredientName: '', ingredientQty: '' }]);

    // Ingredients List: Handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...ingList]
        list[index][name] = value
        setIngList(list)
    }
   
    // Ingredients List: Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...ingList]
        list.splice(index, 1)
        setIngList(list)
    }
   
    // Ingredients List: Handle click event of the Add button
    const handleAddClick = () => {
        setIngList([...ingList, { ingredientName: '', ingredientQty: '' }])
    }

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
        {ingList.map((x, i) => {
            return (
                <div className="ingredientsInputList">
                    <input
                        type="text"
                        name="ingredientName"
                        value={x.ingredientName}
                        onChange={e => handleInputChange(e, i)}
                        required
                    />
                    <input
                        type="text"
                        className="ingredientQty"
                        name="ingredientQty"
                        value={x.ingredientQty}
                        onChange={e => handleInputChange(e, i)}
                        required
                    />
                    <div className="ingredientListButtons">
                        {ingList.length !== 1 && <button 
                            type="button" 
                            className="ingredientRm" 
                            onClick={() => handleRemoveClick(i)}>Remove</button>}
                    </div>
                    {ingList.length - 1 === i && <button 
                        type="button" 
                        className="ingredientAdd" 
                        onClick={handleAddClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Add Ingredient
                        </button>}
                </div>
                )
            }
        )}
        <input type="file"
            onChange={e => setFiles(e.target.files)} 
        />
        <Editor onChange={setContent} value={content} />
        <button type="submit" style={{marginTop:'5px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost