import { useState } from 'react'
import { redirect } from 'next/navigation'


const ProfileDescription = ({ user }) => {
    const [description, setDescription] = useState('')
    const [doRedirect, setDoRedirect] = useState(false)

    const submitDescription = async (e) => {
        e.preventDefault()
        const response = await fetch(`/server/settings/description`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            body: JSON.stringify({ description: description, user: user })
        })
        const resJSON = await response.json()
        const isProfane = resJSON.profane
        if (isProfane) console.log('Profanity is not allowed.')
        else if (response.ok) {
            console.log(response, 'Profile description has been updated.')
            setDoRedirect(true)
        }
    }

    if (doRedirect) redirect('/profile/settings')

    return (
        <form
            onSubmit={(e) => submitDescription(e)}
            className="flex flex-col gap-5 mt-5 w-full"
        >
            <label htmlFor="description">Change your profile description:</label>
            <textarea
                id="description"
                placeholder="Tell other truckers about yourself!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-gray-400 p-2"
            />
            <button
                type="submit"
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
    )
}

export default ProfileDescription