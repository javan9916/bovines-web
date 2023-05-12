import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HiCheck } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


export default function CreateSector() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const response = await api.post('animals/api/sectors/', data)

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
                    <h1> Nuevo sector </h1>
                    <form onSubmit={onSubmit}>
                        <div className='grid'>
                            <label htmlFor='name'>
                                Nombre
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Nombre del sector'
                                    aria-invalid={errors.name ? 'true' : ''}
                                    {...register('name', { required: true })} />
                            </label>

                            <label htmlFor='area'>
                                Área
                                <input
                                    id='area'
                                    name='area'
                                    type='number'
                                    placeholder='Área del terreno'
                                    aria-invalid={errors.area ? 'true' : ''}
                                    {...register('area', { required: true })} />
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