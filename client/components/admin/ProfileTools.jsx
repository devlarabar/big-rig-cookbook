const ProfileTools = ({ username }) => {
    const deleteUser = async (e) => {
        e.preventDefault()
        const response = await fetch('/server/admin/deleteuser', {
            method: 'POST',
            body: JSON.stringify({ username: username }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL
            },
            credentials: 'include'
        })
        const info = response.json()
        if (info.success) {
            window.location = '/home'
        }
    }
    return (
        <div>
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Admin Tools
                </div>
                <div className="collapse-content">
                    <form onSubmit={(e) => deleteUser(e)} className="flex flex-col w-full max-w-[350px] gap-4">

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileTools