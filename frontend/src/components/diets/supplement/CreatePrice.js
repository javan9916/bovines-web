import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


export default function CreatePrice() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [price, setPrice] = useState('')

    const { id } = useParams()

    function createPrice(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            price: price,
            supplement: id
        }

        const url = baseURL + 'diets/api/price_history/'
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
                <h1> Nuevo precio </h1>
                <form onSubmit={createPrice}>
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