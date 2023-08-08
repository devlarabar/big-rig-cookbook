import React from 'react'

const CreatePostInputs = (props) => {
    const { prepTime, setPrepTime } = props
    const { cookTime, setCookTime } = props
    const { title, setTitle } = props
    const { summary, setSummary } = props
    const { req } = props

    return (
        <div>
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
            <input
                type="number"
                min="1"
                placeholder={'Prep Time'}
                value={prepTime}
                onChange={e => setPrepTime(e.target.value)}
                required={req}
            />
            <input
                type="number"
                min="1"
                placeholder={'Cook Time'}
                value={cookTime}
                onChange={e => setCookTime(e.target.value)}
                required={req}
            />
        </div>
    )
}

export default CreatePostInputs