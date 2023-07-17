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

    const [ ingList, setIngList ] = useState([{ name: '', qty: '', measurement: '' }])
    const [ cookwareList, setCookwareList ] = useState([''])

    useEffect(() => {
        fetch(`http://localhost:4000/post/view/${id}`).then(response => {
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
            ingredients: ingList[0].name ? ingList : [],
            prepTime,
            cookTime
        }

        const response = await fetch('http://localhost:4000/post/edit/', {
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
        return <Navigate to={`/post/view/${id}`} />
    }

  return (
    <form onSubmit={updatePost} className="flex flex-column big-gap form-recipe">
        <h2>Edit Recipe: {title}</h2>
        <h3><span>Title & Summary</span></h3>
        <input 
            type="title" 
            placeholder={'Title'} 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            className="width-100"
        />
        <input 
            type="summary" 
            placeholder={'Summary'} 
            value={summary} 
            onChange={e => setSummary(e.target.value)}
            className="width-100"
        />
        <h3><span>Ingredients</span></h3>
        <Ingredients ingList={ingList} setIngList={setIngList}/>
        <h3><span>Cookware</span></h3>
        <AddCookware cookwareList={cookwareList} setCookwareList={setCookwareList}/>
        <h3><span>Preparation & Cook Time</span></h3>
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
        <h3><span>Directions</span></h3>
        <Editor onChange={setContent} value={content} />
        <button type="submit" className="btn-createpost">Update Post</button>
    </form>
  )
}

export default EditPost