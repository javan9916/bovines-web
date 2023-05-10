import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HashLoader } from 'react-spinners'
import { HiCheck } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


export default function CreateCategory() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        const response = await api.post('costs/api/categories/', data)

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
                    <h1> Nueva categoría </h1>
                    <form onSubmit={onSubmit}>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre de la categoría'
                                {...register('name', { required: true })} />
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