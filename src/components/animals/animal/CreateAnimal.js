import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import { HiCheck } from 'react-icons/hi'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


export default function CreateAnimal() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const response = await api.post('animals/api/animals/', data)

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
                    <h1> Nuevo animal </h1>
                    <form onSubmit={onSubmit}>
                        <div className='grid'>
                            <label htmlFor='badge_number'>
                                Identificador
                                <input
                                    id='badge_number'
                                    name='badge_number'
                                    type='number'
                                    placeholder='Identificador del animal'
                                    aria-invalid={errors.badge_number ? 'true' : ''}
                                    {...register('badge_number', { required: true })} />
                            </label>

                            <label htmlFor='cost_per_kg'>
                                Precio del animal por kg
                                <input
                                    id='cost_per_kg'
                                    name='cost_per_kg'
                                    type='number'
                                    placeholder='Precio del animal'
                                    aria-invalid={errors.cost_per_kg ? 'true' : ''}
                                    {...register('cost_per_kg', { required: true })} />
                            </label>
                        </div>

                        <div className='grid'>
                            <label htmlFor='breed'>
                                Raza
                                <input
                                    id='breed'
                                    name='breed'
                                    type='text'
                                    placeholder='Raza del animal'
                                    aria-invalid={errors.breed ? 'true' : ''}
                                    {...register('breed', { required: true })} />
                            </label>

                            <label htmlFor='origin'>
                                Procedencia del animal
                                <select
                                    id='origin'
                                    name='origin'
                                    aria-invalid={errors.origin ? 'true' : ''}
                                    {...register('origin', { required: true })} >
                                    <option value='' disabled>Seleccionar</option>
                                    <option value='F'>Finca</option>
                                    <option value='S'>Subasta</option>
                                </select>
                            </label>

                            <label htmlFor='sex'>
                                Sexo del animal
                                <select
                                    id='sex'
                                    name='sex'
                                    aria-invalid={errors.sex ? 'true' : ''}
                                    {...register('sex', { required: true })} >
                                    <option value='' disabled>Seleccionar</option>
                                    <option value='M'>Macho</option>
                                    <option value='H'>Hembra</option>
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