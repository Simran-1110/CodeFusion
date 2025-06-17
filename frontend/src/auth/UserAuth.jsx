import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'

const UserAuth = ({ children }) => {

    const { user } = useContext(UserContext)
    const [ loading, setLoading ] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()


    useEffect(() => {
        if (token) {
            axios.defaults.headers.authorization = `Bearer ${token}`;
        }
        if (user) {
            setLoading(false)
        }
        if (!token) {
            navigate('/login')
        }

        if (!user) {
            navigate('/login')
        }
        

    }, [token])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {children}</>
    )
}

export default UserAuth