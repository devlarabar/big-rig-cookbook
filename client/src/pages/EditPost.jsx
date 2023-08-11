import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AddCookware from '../features/recipes/create/AddCookware'
import { Ingredients } from '../features/recipes/create/Ingredients'
import Directions from '../features/recipes/create/Directions'
import CreatePostInputs from '../features/recipes/create/CreatePostInputs'

const EditPost = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [redirect, setRedirect] = useState(false)
    //const [files, setFiles] = useState('')

    const [ingList, setIngList] = useState([{ name: '', qty: '', measurement: '' }])
    const [cookwareList, setCookwareList] = useState([''])
    const [directionsList, setDirectionsList] = useState([''])

    useEffect(() => {
        fetch(`http://localhost:4000/post/view/${id}`).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setDirectionsList(postInfo.directions)
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
            directions: directionsList,
            ingredients: ingList[0]?.ingredient ? ingList : [],
            cookware: cookwareList,
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
            <h3><span>General Information</span></h3>
            <CreatePostInputs
                title={title}
                setTitle={setTitle}
                summary={summary}
                setSummary={setSummary}
                prepTime={prepTime}
                setPrepTime={setPrepTime}
                setCookTime={setCookTime}
                cookTime={cookTime}
                req={false}
            />
            <h3><span>Ingredients</span></h3>
            <Ingredients ingList={ingList} setIngList={setIngList} />
            <h3><span>Cookware</span></h3>
            <AddCookware cookwareList={cookwareList} setCookwareList={setCookwareList} />
            <h3><span>Directions</span></h3>
            <Directions directionsList={directionsList} setDirectionsList={setDirectionsList} />
            <button type="submit" className="btn-createpost">Update Post</button>
        </form>
    )
}

export default EditPost