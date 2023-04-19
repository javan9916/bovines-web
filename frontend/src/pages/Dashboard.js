import { useContext, useEffect } from "react"
import { LoginContext } from "../App"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('access')) {
            setLoggedIn(false)
            navigate('/login')
        }
    })

    return (
        <main className="container">
            <h1> This is the Dashboard </h1>
        </main>
    )
}