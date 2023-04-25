import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


export default function CreateAnimal() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [badgeNumber, setBadgeNumber] = useState('')
    const [sex, setSex] = useState('')
    const [breed, setBreed] = useState('')
    const [origin, setOrigin] = useState('')
    const [costPerKG, setCostPerKG] = useState('')

    function createAnimal(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            sex: sex,
            breed: breed,
            origin: origin,
            badge_number: badgeNumber,
            cost_per_kg: costPerKG
        }

        const url = baseURL + 'animals/api/animals/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
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
                <h1> Nuevo animal </h1>
                <form onSubmit={createAnimal}>
                    <div className='grid'>
                        <label htmlFor='badge_number'>
                            Identificador
                            <input
                                id='badge_number'
                                name='badge_number'
                                type='number'
                                placeholder='Identificador del animal'
                                value={badgeNumber}
                                onChange={(e) => { setBadgeNumber(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='cost_per_kg'>
                            Precio del animal por kg
                            <input
                                id='cost_per_kg'
                                name='cost_per_kg'
                                type='number'
                                placeholder='Precio del animal'
                                value={costPerKG}
                                onChange={(e) => { setCostPerKG(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='grid'>
                        <label htmlFor='breed'>
                            Raza
                            <input
                                id='breed'
                                name='breed'
                                type='text'
                                placeholder='Raza del animal'
                                value={breed}
                                onChange={(e) => { setBreed(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='origin'>
                            Procedencia del animal
                            <select
                                id='origin'
                                name='origin'
                                value={origin}
                                onChange={(e) => { setOrigin(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                <option value='F'>Finca</option>
                                <option value='S'>Subasta</option>
                            </select>
                        </label>

                        <label htmlFor='sex'>
                            Sexo del animal
                            <select
                                id='sex'
                                name='sex'
                                value={sex}
                                onChange={(e) => { setSex(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                <option value='M'>Macho</option>
                                <option value='H'>Hembra</option>
                            </select>
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