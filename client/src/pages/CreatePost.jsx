import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import AddCookware from '../features/recipes/create/AddCookware'
import { Ingredients } from '../features/recipes/create/Ingredients'
import Directions from '../features/recipes/create/Directions'
import CreatePostInputs from '../features/recipes/create/CreatePostInputs'

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
            req={true}
        />
        <h3><span>Ingredients</span></h3>
        <Ingredients ingList={ingList} setIngList={setIngList}/>
        <h3><span>Cookware</span></h3>
        <AddCookware cookwareList={cookwareList} setCookwareList={setCookwareList}/>
        <h3><span>Directions</span></h3>
        <Directions directionsList={directionsList} setDirectionsList={setDirectionsList} />
        <button type="submit" className="btn-createpost">Create Post</button>
    </form>
  )
}

export default CreatePost