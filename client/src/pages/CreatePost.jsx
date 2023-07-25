import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AddCookware from '../features/recipes/create/AddCookware'
import { Ingredients } from '../features/recipes/create/Ingredients'
import Directions from '../features/recipes/create/Directions'

const CreatePost = () => {
    const [ title, setTitle ] = useState('')
    const [ summary, setSummary ] = useState('')
    const [ prepTime, setPrepTime ] = useState('')
    const [ cookTime, setCookTime ] = useState('')
    const [ redirect, setRedirect ] = useState(false)

    const [ ingList, setIngList ] = useState([])
    const [ cookwareList, setCookwareList ] = useState([''])
    const [ directionsList, setDirectionsList ] = useState([''])

    // Form submit: Add post to the DB    
    async function createNewPost(e) {
        e.preventDefault()

        if (ingList[0] === '') {
            alert('Please enter at least one ingredient!')
        } else {
            const postData = {
                title,
                summary,
                ingredients: ingList[0].ingredient ? ingList : [],
                cookware: cookwareList,
                directions: directionsList,
                prepTime,
                cookTime
            }
    
            const response = await fetch('http://localhost:4000/post/create', {
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
    }
    
    if (redirect) {
        return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={createNewPost} className="flex flex-column big-gap form-recipe">
        <h2>Create a Recipe</h2>
        <h3><span>Title & Summary</span></h3>
        <input 
            type="title" 
            placeholder={'Title'} 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            className="width-100"
            required
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
            placeholder={'Prep Time'}
            value={prepTime}
            onChange={e => setPrepTime(e.target.value)}
            required
        />
        <input
            type="number"
            min="1"
            placeholder={'Cook Time'}
            value={cookTime}
            onChange={e => setCookTime(e.target.value)}
            required
        />
        <h3><span>Directions</span></h3>
        {/* <Editor onChange={setContent} value={content} /> */}
        <Directions directionsList={directionsList} setDirectionsList={setDirectionsList} />
        <button type="submit" className="btn-createpost">Create Post</button>
    </form>
  )
}

export default CreatePost