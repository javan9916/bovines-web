import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HashLoader } from 'react-spinners'
import { HiCheck } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


export default function CreatePrice() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm()

    const { id } = useParams()

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        data.supplement = id
        const response = await api.post('diets/api/price_history/', data)

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
                    <h1> Nuevo precio </h1>
                    <form onSubmit={onSubmit}>
                        <label htmlFor='price'>
                            Precio
                            <input
                                id='price'
                                name='price'
                                type='number'
                                {...register('price', { required: true })} />
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