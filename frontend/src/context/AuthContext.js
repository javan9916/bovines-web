import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    )
    const navigate = useNavigate()
}