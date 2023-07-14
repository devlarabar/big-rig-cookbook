import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../Editor'
import AddCookware from '../AddCookware'
import { Ingredients } from '../Ingredients'

const EditPost = () => {
    const { id } = useParams()
    const [ title, setTitle ] = useState('')
    const [ summary, setSummary ] = useState('')
    const [ content, setContent ] = useState('')
    const [ prepTime, setPrepTime ] = useState('')
    const [ cookTime, setCookTime ] = useState('')
    const [ redirect, setRedirect ] = useState(false)
    //const [files, setFiles] = useState('')

    const [ ingList, setIngList ] = useState([{ ingredientName: '', ingredientQty: '' }])
    const [ cookwareList, setCookwareList ] = useState([''])

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)
                setIngList(postInfo.ingredients)
                setCookwareList(postInfo.cookware)
                setPrepTime(postInfo.prepTime)
                setCookTime(postInfo.cookTime)
            })
        })
    }, [id])

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
            prepTime,
            cookTime,
            //file: files[0]
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
        <Ingredients ingList={ingList} setIngList={setIngList}/>
        <AddCookware cookwareList={cookwareList} setCookwareList={setCookwareList}/>
        {/* <h3>Image</h3>
        <input type="file"
            onChange={e => setFiles(e.target.files)} 
        /> */}
        <input
            type="number"
            min="1"
            placeholder={'prepTime'}
            value={prepTime}
            onChange={e => setPrepTime(e.target.value)}
        />
        <input
            type="number"
            min="1"
            placeholder={'cookTime'}
            value={cookTime}
            onChange={e => setCookTime(e.target.value)}
        />
        <h3>Directions</h3>
        <Editor onChange={setContent} value={content} />
        <button style={{marginTop:'5px'}}>Update Post</button>
    </form>
  )
}

export default EditPost