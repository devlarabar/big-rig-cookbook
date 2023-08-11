import React from 'react'

const CreatePostInputs = (props) => {
    const { prepTime, setPrepTime } = props
    const { cookTime, setCookTime } = props
    const { title, setTitle } = props
    const { summary, setSummary } = props
    const { req } = props

    return (
        <div className="flex flex-column med-gap ing-inputs">
            <label for="title">Name</label><input
                type="title"
                placeholder={'Title'}
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="width-100"
                id="title"
                required={req}
            />
            <label for="summary">Summary</label><input
                type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="width-100"
                id="summary"
            />
            <div className="flex med-gap flex-stretch">
                <div className="flex-1">
                    <label for="preptime">Prep Time</label><input
                        type="number"
                        min="1"
                        placeholder={'Prep time in minutes'}
                        value={prepTime}
                        onChange={e => setPrepTime(e.target.value)}
                        className="width-100"
                        id="preptime"
                        required={req}
                    />
                </div>
                <div className="flex-1">
                    <label for="cooktime">Cook Time</label><input
                        type="number"
                        min="1"
                        placeholder={'Cook time in minutes'}
                        value={cookTime}
                        onChange={e => setCookTime(e.target.value)}
                        className="width-100"
                        id="cooktime"
                        required={req}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreatePostInputs