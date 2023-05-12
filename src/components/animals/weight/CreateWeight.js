import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import { HiCheck } from 'react-icons/hi'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


export default function CreateWeight() {
    const api = useAxios()

    const todayDate = new Date()
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { id } = useParams()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        data.animal = id
        const body = { data }
        const response = await api.post('animals/api/weights/', body)

        if (response.status === 201) {
            toast.success('¡Creado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    })

    if (loading) {
        return <Loading />
    } else {
        return (
            <main className='container'>
                <section>
                    <h1>Nuevo pesaje</h1>
                    <form onSubmit={onSubmit}>
                        <div className='grid'>
                            <label htmlFor='weight'>
                                Peso del animal
                                <div className='measure-input'>
                                    <input
                                        id='weight'
                                        name='weight'
                                        type='number'
                                        placeholder='Peso'
                                        aria-invalid={errors.weight ? 'true' : ''}
                                        {...register('weight', { required: true })} />
                                    <div className='centered-flex-container'>KG</div>
                                </div>
                            </label>
    
                            <label htmlFor='date'>
                                Fecha del pesaje
                                <input
                                    id='date'
                                    name='date'
                                    type='date'
                                    max={new Date().toISOString().split('T')[0]}
                                    aria-invalid={errors.date ? 'true' : ''}
                                    {...register('date', { required: true, value: formattedDate })} />
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
