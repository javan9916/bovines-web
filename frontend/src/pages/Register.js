import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../shared'


export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    function createUser(e) {
        e.preventDefault()
        
        if (password !== checkPassword) {
            toast.error('Las contraseñas deben coincidir')
            return
        }
        setLoading(true)
        
        const data = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }

        const url = baseURL + 'users/api/users/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404)
                        navigate('/404')
                    else
                        navigate('/500')
                }
                return response.json()
            })
            .then(() => {
                toast.success('¡Creado correctamente!')
                setLoading(false)
                navigate('/login')
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    return (
        <main>
            <section>
                <h1> Nuevo usuario </h1>
                <form onSubmit={createUser}>
                    <div className='grid'>
                        <label htmlFor='username'>
                            Nombre de usuario
                            <input
                                id='username'
                                name='username'
                                type='text'
                                placeholder='Nombre de usuario'
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='first_name'>
                            Nombre
                            <input
                                id='first_name'
                                name='first_name'
                                type='text'
                                placeholder='Nombre'
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='last_name'>
                            Apellido
                            <input
                                id='last_name'
                                name='last_name'
                                type='text'
                                placeholder='Apellido'
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <label htmlFor='email'>
                        Correo electrónico
                        <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='prueba@email.com'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required />
                    </label>

                    <div className='grid'>
                        <label htmlFor='password'>
                            Contraseña
                            <input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='check_password'>
                            Confirmar contraseña
                            <input
                                id='check_password'
                                name='check_password'
                                type='password'
                                placeholder='Contraseña'
                                value={checkPassword}
                                onChange={(e) => { setCheckPassword(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='centered-flex-container'>
                        <div className='flex-3' />
                        <button aria-busy={loading} type='submit' className='flex-1 navlink-button flex-container no-decoration'>
                            <HiCheck />
                            &nbsp;
                            <p>Completar</p>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}