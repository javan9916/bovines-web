import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


export default function CreateSupplement() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [kg, setKg] = useState('')

    function createSupplement(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            name: name,
            description: description,
            price: price,
            kg_presentation: kg
        }

        const url = baseURL + 'api/supplement/'
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
                navigate(-1)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    return (
        <main>
            <section>
                <h1> Nuevo suplemento </h1>
                <form onSubmit={createSupplement}>
                    <label htmlFor='name'>
                        Nombre
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Nombre del suplemento'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            required />
                    </label>

                    <div className='grid'>
                        <label htmlFor='kg'>
                            Presentación (KG)
                            <div className='measure-input'>
                                <input
                                    id='kg'
                                    name='kg'
                                    type='number'
                                    placeholder='Presentación del suplemento'
                                    value={kg}
                                    onChange={(e) => { setKg(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='price'>
                            Precio
                            <input
                                id='price'
                                name='price'
                                type='number'
                                placeholder='Precio del suplemento'
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <label htmlFor='description'>
                        Descripción
                        <textarea
                            id='description'
                            name='description'
                            placeholder='Descripción del suplemento'
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            required />
                    </label>

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