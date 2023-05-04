import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { baseURL } from '../shared'
import { toast } from 'react-hot-toast'


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    )
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwt_decode(localStorage.getItem('authTokens'))
            : null
    )

    const navigate = useNavigate()

    const loginUser = async (username, password) => {
        const url = baseURL + 'users/api/token'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else toast.error('Algo salió mal')
    }

    const registerUser = async (username, first_name, last_name, email, password, password2) => {
        const url = baseURL + 'users/api/users/'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                first_name,
                last_name,
                email,
                password,
                password2
            })
        })
        if (response.status === 201) navigate('/login')
        else toast.error('Algo salió mal')
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ?
                <div className='centered-flex-container'>
                    <div className='loader' />
                </div>
                :
                children
            }
        </AuthContext.Provider>
    )
}