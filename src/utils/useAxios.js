import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import { baseURL } from '../shared'


const authURL = baseURL + `users/api`

const useAxios = () => {
    const navigate = useNavigate()

    const { authTokens, setUser, logoutUser, setAuthTokens } = useContext(AuthContext)

    if (!authTokens) {
        navigate('/login')
    } else {
        const axiosInstance = axios.create({
            baseURL,
            headers: { Authorization: `Bearer ${authTokens.access}` }
        })

        axiosInstance.interceptors.request.use(async req => {
            const user = jwt_decode(authTokens.access)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

            if (!isExpired) return req
            if (!authTokens.refresh) logoutUser()

            const response = await axios.post(`${authURL}/token/refresh`, {
                refresh: authTokens.refresh
            })

            localStorage.setItem('authTokens', JSON.stringify(response.data))

            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))

            req.headers.Authorization = `Bearer ${response.data.access}`
            return req
        })

        return axiosInstance
    }

}

export default useAxios
