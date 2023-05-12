import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HiCheck } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


export default function CreateCost() {
    const api = useAxios()

    const todayDate = new Date()
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [categories, setCategories] = useState([])

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const response = await api.post('costs/api/costs/', data)

        if (response.status === 201) {
            toast.success('¡Creado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    })

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const categories = await api.get(`costs/api/categories/`)

                setCategories(categories.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate])

    if (loading) {
        return <Loading />
    } else {
        return (
            <main>
                <section>
                    <h1> Nuevo costo </h1>
                    <form onSubmit={onSubmit}>
                        <div className='grid'>
                            <label htmlFor='name'>
                                Nombre
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Nombre del costo'
                                    aria-invalid={errors.name ? 'true' : ''}
                                    {...register('name', { required: true })} />
                            </label>
    
                            <label htmlFor='date'>
                                Fecha del costo
                                <input
                                    id='date'
                                    name='date'
                                    type='date'
                                    aria-invalid={errors.date ? 'true' : ''}
                                    {...register('date', { required: true, value: formattedDate })} />
                            </label>
    
                            <label htmlFor='cost'>
                                Total
                                <input
                                    id='cost'
                                    name='cost'
                                    type='number'
                                    placeholder='Total del costo'
                                    aria-invalid={errors.cost ? 'true' : ''}
                                    {...register('cost', { required: true })} />
                            </label>
                        </div>
    
                        <div className='grid'>
                            <label htmlFor='category'>
                                Categoría
                                <select
                                    id='category'
                                    name='category'
                                    aria-invalid={errors.category ? 'true' : ''}
                                    {...register('category', { required: true })}>
                                    <option value='' disabled>Seleccionar</option>
                                    {categories.map((category, key) =>
                                        <option key={key} value={category.id}>{category.name}</option>
                                    )}
                                </select>
                            </label>
    
                            <label htmlFor='type'>
                                Tipo de costo
                                <select
                                    id='type'
                                    name='type'
                                    aria-invalid={errors.type ? 'true' : ''}
                                    {...register('type', { required: true })}>
                                    <option value='' disabled>Seleccionar</option>
                                    <option value='I'>Inversión</option>
                                    <option value='G'>Gasto</option>
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
}