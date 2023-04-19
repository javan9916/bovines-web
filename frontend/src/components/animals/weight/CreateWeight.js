import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


export default function CreateWeight() {
    const todayDate = new Date()
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [weight, setWeight] = useState('')
    const [weightDate, setWeightDate] = useState(formattedDate)

    const { id } = useParams()

    function createWeight(e) {
        setLoading(true)
        e.preventDefault()

        const body = {
            data: {
                animal: id,
                weight: weight,
                date: weightDate
            }
        }

        const url = baseURL + 'api/weight/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(body)
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
                <h1>Nuevo pesaje</h1>
                <form onSubmit={createWeight}>
                    <div className='grid'>
                        <label htmlFor='weight'>
                            Peso del animal
                            <div className='measure-input'>
                                <input
                                    id='weight'
                                    name='weight'
                                    type='number'
                                    placeholder='Peso'
                                    value={weight}
                                    onChange={(e) => { setWeight(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='weight_date'>
                            Fecha del pesaje
                            <input
                                id='weight_date'
                                name='weight_date'
                                type='date'
                                max={new Date().toISOString().split('T')[0]}
                                value={weightDate}
                                onChange={(e) => { setWeightDate(e.target.value) }}
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
