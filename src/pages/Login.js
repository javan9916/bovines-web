import { useContext, useState } from 'react'

import AuthContext from '../context/AuthContext'
import Loading from '../components/Loading'


export default function Login() {
    const { loginUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        loginUser(username, password).then(() => setLoading(false))
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <main className='container'>
                <article className='grid'>
                    <div>
                        <hgroup>
                            <h1>Inicio de sesión</h1>
                            <h2>Digite sus credenciales para ingresar</h2>
                        </hgroup>
                        <form onSubmit={handleSubmit}>
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
                    </div>
                </article>
                {/* 
                        <hr className='separator-30-margin' />
                            
                        <button onClick={() => navigate('/register')}>
                            Nuevo usuario
                        </button>
                    */}
            </main>
        )
    }
}