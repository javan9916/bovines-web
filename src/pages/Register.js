import { useState, useContext } from 'react'

import { HiCheck } from 'react-icons/hi'
import AuthContext from '../context/AuthContext'


export default function Register() {
    const { registerUser } = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        registerUser(username, firstName, lastName, email, password, password2)
    }

    return (
        <main>
            <section>
                <h1> Nuevo usuario </h1>
                <form onSubmit={handleSubmit}>
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

                        <label htmlFor='password2'>
                            Confirmar contraseña
                            <input
                                id='password2'
                                name='password2'
                                type='password'
                                placeholder='Contraseña'
                                value={password2}
                                onChange={(e) => { setPassword2(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='centered-flex-container'>
                        <div className='flex-3' />
                        <button type='submit' className='flex-1 navlink-button flex-container no-decoration'>
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