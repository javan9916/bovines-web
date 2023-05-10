import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HashLoader } from 'react-spinners'
import { HiCheck } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


export default function CreateSupplement() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const response = await api.post('diets/api/supplements/', data)

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
                    <h1> Nuevo suplemento </h1>
                    <form onSubmit={onSubmit}>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre del suplemento'
                                {...register('name', { required: true })} />
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
                                        {...register('kg_presentation', { required: true })} />
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
                                    {...register('price', { required: true })} />
                            </label>
                        </div>

                        <label htmlFor='description'>
                            Descripción
                            <textarea
                                id='description'
                                name='description'
                                placeholder='Descripción del suplemento'
                                {...register('description', { required: true })} />
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
}