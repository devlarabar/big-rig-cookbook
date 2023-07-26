import { useState } from 'react'

const AdminAddData = () => {
    const [ingName, setIngName] = useState('')
    const [ingType, setIngType] = useState('')
    const [achievementName, setAchievementName] = useState('')
    const [recipeReq, setRecipeReq] = useState('')
    const [stretchReq, setStretchReq] = useState('')

    const formDataIngredient = {
        name: ingName,
        type: ingType
    }
    const formDataAchievement = {
        name: achievementName,
        requirements: {
            recipes: recipeReq,
            stretchStreak: stretchReq
        }
    }
    function addIngredient() {
        fetch('http://localhost:4000/admin/addingredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formDataIngredient)
        })
    }
    function addAchievement() {
        fetch('http://localhost:4000/admin/addachievement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formDataAchievement)
        })
    }
    return (
        <div>
            <form onSubmit={addIngredient} className="flex flex-column big-gap form-recipe">
                <h3><span>Add Ingredients</span></h3>
                <input
                    type="text"
                    placeholder={'Name'}
                    onChange={e => setIngName(e.target.value)}
                    className="width-100"
                    required
                />
                <select
                    onChange={e => setIngType(e.target.value)}
                    className="width-100"
                    required
                >
                    <option value="" disabled>- Select -</option>
                    <option value="meat">Meat</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="spice">Spice</option>
                    <option value="cheese">Cheese</option>
                    <option value="grain">Grain</option>
                    <option value="bread">Bread</option>
                    <option value="fish">Fish</option>
                    <option value="sugar">Sugar</option>
                    <option value="dairy">Dairy</option>
                    <option value="egg">Egg</option>
                    <option value="hot">Hot (Spicy)</option>
                    </select>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={addAchievement} className="flex flex-column big-gap form-recipe">
                <h3><span>Add Achievements</span></h3>
                <input
                    type="text"
                    placeholder={'Name'}
                    onChange={e => setAchievementName(e.target.value)}
                    className="width-100"
                    required
                />
                <input
                    type="number"
                    placeholder={'Recipe Requirement'}
                    onChange={e => setRecipeReq(e.target.value)}
                    className="width-100"
                    required
                />
                <input
                    type="number"
                    placeholder={'Stretch Streak Requirement'}
                    onChange={e => setStretchReq(e.target.value)}
                    className="width-100"
                    required
                />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AdminAddData