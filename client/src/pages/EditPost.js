import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../Editor'
import AddIngredients from '../AddIngredients'

const EditPost = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const [ ingList, setIngList ] = useState([{ ingredientName: '', ingredientQty: '' }]);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)
                setIngList(postInfo.ingredients)
            })
        })
    }, [])

    

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

    async function updatePost(e) {
        e.preventDefault()

        // const data = new FormData()
        // data.set('title', title)
        // data.set('summary', summary)
        // data.set('content', content)
        // data.set('id', id)
        // if (files?.[0]) {
        //     data.set('file', files?.[0])
        // }

        const postData = {
            id,
            title,
            summary,
            content,
            ingredients: ingList[0].ingredientName ? ingList : [],
            file: files[0]
        }

        const response = await fetch('http://localhost:4000/post/', {
            method: 'PUT',
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
        return <Navigate to={`/post/${id}`} />
    }

  return (
    <form onSubmit={updatePost}>
        <h2>Edit Recipe: {title}</h2>
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
        <button style={{marginTop:'5px'}}>Update Post</button>
    </form>
  )
}

export default EditPost