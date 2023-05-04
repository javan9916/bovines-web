import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import { HiCheck } from 'react-icons/hi'
import useAxios from '../../../utils/useAxios'


export default function CreateSector() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const response = await api.post('animals/api/sectors/', data)

        if (response.status === 201) {
            toast.success('¡Creado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    })

    return (
        <main>
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
                                {...register('name', { required: true })} />
                        </label>

                        <label htmlFor='area'>
                            Área
                            <input
                                id='area'
                                name='area'
                                type='number'
                                placeholder='Área del terreno'
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