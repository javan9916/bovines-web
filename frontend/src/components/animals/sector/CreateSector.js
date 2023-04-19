import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


export default function CreateSector() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [area, setArea] = useState('')

    function createSector(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            name: name,
            area: area
        }

        const url = baseURL + 'api/sector/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${localStorage.getItem('access')}`
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
                navigate(-1)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    return (
        <main>
            <section>
                <h1> Nuevo sector </h1>
                <form onSubmit={createSector}>
                    <div className='grid'>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre del sector'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='area'>
                            Área
                            <input
                                id='area'
                                name='area'
                                type='number'
                                placeholder='Área del terreno'
                                value={area}
                                onChange={(e) => { setArea(e.target.value) }}
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