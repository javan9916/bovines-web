import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


export default function CreateInitialWeights() {
    const todayDate = new Date()
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [purchaseWeight, setPurchaseWeight] = useState('')
    const [purchaseWeightDate, setPurchaseWeightDate] = useState(formattedDate)
    const [arrivalWeight, setArrivalWeight] = useState('')
    const [arrivalWeightDate, setArrivalWeightDate] = useState(formattedDate)

    const { id } = useParams()

    function createInitialWeights(e) {
        setLoading(true)
        e.preventDefault()

        const body = {
            data: [
                {
                    animal: id,
                    weight: purchaseWeight,
                    date: purchaseWeightDate
                },
                {
                    animal: id,
                    weight: arrivalWeight,
                    date: arrivalWeightDate
                }
            ]
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
                <h1>Pesajes iniciales</h1>
                <form onSubmit={createInitialWeights}>
                    <div className='grid'>
                        <label htmlFor='purchase_weight'>
                            Peso en compra
                            <div className='measure-input'>
                                <input
                                    id='purchase_weight'
                                    name='purchase_weight'
                                    type='number'
                                    placeholder='Peso en compra'
                                    value={purchaseWeight}
                                    onChange={(e) => { setPurchaseWeight(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='purchase_weight_date'>
                            Fecha de compra
                            <input
                                id='purchase_weight_date'
                                name='purchase_weight_date'
                                type='date'
                                max={new Date().toISOString().split('T')[0]}
                                value={purchaseWeightDate}
                                onChange={(e) => { setPurchaseWeightDate(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='grid'>
                        <label htmlFor='arrival_weight'>
                            Peso en finca
                            <div className='measure-input'>
                                <input
                                    id='arrival_weight'
                                    name='arrival_weight'
                                    type='number'
                                    placeholder='Peso en finca'
                                    value={arrivalWeight}
                                    onChange={(e) => { setArrivalWeight(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='arrival_weight_date'>
                            Fecha de ingreso
                            <input
                                id='arrival_weight_date'
                                name='arrival_weight_date'
                                type='date'
                                min={new Date(purchaseWeightDate).toISOString().split('T')[0]}
                                value={arrivalWeightDate}
                                onChange={(e) => { setArrivalWeightDate(e.target.value) }}
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