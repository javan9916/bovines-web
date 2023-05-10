import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HiCheck } from 'react-icons/hi'
import { HashLoader } from 'react-spinners'

import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


export default function CreateInitialWeights() {
    const api = useAxios()

    const todayDate = new Date()
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const { id } = useParams()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const body = {
            data: [
                {
                    animal: id,
                    weight: data.purchase_weight,
                    date: data.purchase_date
                },
                {
                    animal: id,
                    weight: data.arrival_weight,
                    date: data.arrival_date
                }
            ]
        }
        const response = await api.post('animals/api/weights/', body)

        if (response.status === 201) {
            toast.success('¡Creado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    })

    if (loading) {
        return (
            <div className='loader-container'>
                <HashLoader color={spinnerColor} loading={loading} />
            </div>
        )
    } else {
        return (
            <main className='container'>
                <section>
                    <h1>Pesajes iniciales</h1>
                    <form onSubmit={onSubmit}>
                        <div className='grid'>
                            <label htmlFor='purchase_weight'>
                                Peso en compra
                                <div className='measure-input'>
                                    <input
                                        id='purchase_weight'
                                        name='purchase_weight'
                                        type='number'
                                        placeholder='Peso en compra'
                                        {...register('purchase_weight', { required: true })} />
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
                                    {...register('purchase_date', { required: true, value: formattedDate })} />
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
                                        {...register('arrival_weight', { required: true })} />
                                    <div className='centered-flex-container'>KG</div>
                                </div>
                            </label>

                            <label htmlFor='arrival_weight_date'>
                                Fecha de ingreso
                                <input
                                    id='arrival_weight_date'
                                    name='arrival_weight_date'
                                    type='date'
                                    {...register('arrival_date', { required: true, value: formattedDate })} />
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
}