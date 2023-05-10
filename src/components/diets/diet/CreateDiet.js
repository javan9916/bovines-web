import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HashLoader } from 'react-spinners'

import { HiCheck } from 'react-icons/hi'
import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


const headers = { action: '', quantity: 'Cantidad', name: 'Suplemento' }

export default function CreateDiet() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const { register, handleSubmit } = useForm()

    const [supplements, setSupplements] = useState([])

    function setChecked(event, index) {
        const supps = [...supplements]
        supps[index].isChecked = event.target.checked
        setSupplements(supps)
    }

    function setQuantity(event, index) {
        const supps = [...supplements]
        supps[index].quantity = event.target.value
        setSupplements(supps)
    }

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        data.supplements = supplements.filter(supplement => supplement.isChecked)
        const response = await api.post('diets/api/diets/', data)

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
                const supplements = await api.get('diets/api/supplements/')

                const supplementsList = supplements.data.map((supplement) => ({ ...supplement, isChecked: false, quantity: 0 }))
                setSupplements(supplementsList)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate])

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
                    <h1> Nueva dieta </h1>
                    <form onSubmit={onSubmit}>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre de la dieta'
                                {...register('name', { required: true })} />
                        </label>

                        <h3>Suplementos</h3>
                        <div>

                            {supplements && supplements.length ?
                                <div>
                                    <table>
                                        <thead>
                                            <tr key='headers'>
                                                {Object.keys(headers).map((key) =>
                                                    <th key={key}>{headers[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {supplements.map((supplement, index) =>
                                                <tr
                                                    key={index}>
                                                    <td>
                                                        <input
                                                            type='checkbox'
                                                            onChange={(e) => { setChecked(e, index) }}
                                                            id='supplement_check'
                                                            name='supplement_check'
                                                            value={supplement.id} />
                                                    </td>
                                                    <td className='fit'>
                                                        <input
                                                            value={supplement.quantity}
                                                            onChange={(e) => { setQuantity(e, index) }}
                                                            disabled={!supplement.isChecked}
                                                            id='quantity'
                                                            name='quantity'
                                                        />
                                                    </td>
                                                    <td>{supplement.name}</td>
                                                </tr>

                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay suplementos en la base de datos</h4>
                            }
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