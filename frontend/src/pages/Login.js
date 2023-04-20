import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { baseURL } from '../shared'
import { LoginContext } from '../App'

export default function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function doLogin(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            username: username,
            password: password
        }

        const url = baseURL + 'api/token'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
                setLoggedIn(true)

                navigate('/')
            })
    }

    return (
        <main className='container'>
            <article className='grid'>
                <div>
                    <hgroup>
                        <h1>Inicio de sesión</h1>
                        <h2>Digite sus credenciales para ingresar</h2>
                    </hgroup>
                    <form onSubmit={doLogin}>
                        <input
                            id='username'
                            name='username'
                            type='text'
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            placeholder='Nombre de usuario'
                            required
                        />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder='Contraseña'
                            required
                        />
                        <button type='submit'>Iniciar sesión</button>
                    </form>
                    <hr className='separator-30-margin' />
                    <button onClick={() => navigate('/register')}>
                        Nuevo usuario
                    </button>
                </div>
            </article>
            
        </main>
    )
}