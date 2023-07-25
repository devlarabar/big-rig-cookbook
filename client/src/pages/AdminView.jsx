import { useState, useEffect } from 'react'
import AdminDash from '../features/admin/AdminDash'
import NotFound from './NotFound'

const AdminView = () => {

    const [ admin, setAdmin ] = useState('')

    useEffect(() => {
        (async () => {
            const isAdmin = await fetch('http://localhost:4000/admin/isadmin', {credentials: 'include'})
            const isAdminResponse = await isAdmin.json()
            setAdmin(isAdminResponse.admin)
        })()
    }, [setAdmin])

    return (
        <div>
            {admin && <AdminDash admin={admin}/>}
            {!admin && <NotFound />}
        </div>
    )
}

export default AdminView