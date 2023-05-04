import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiPlus } from 'react-icons/hi'
import DeleteModal from '../../DeleteModal'
import UpdateSupplement from './UpdateSupplement'
import useAxios from '../../../utils/useAxios'


const headers = { price: 'Precio', date: 'Fecha de registro' }
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export default function SupplementDetail() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const [supplement, setSupplement] = useState()

    const handleDelete = async () => {
        setLoading(true)
        const response = await api.delete(`diets/api/supplements/${id}`)

        if (response.status === 204) {
            toast.success('Eliminado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    }

    const handleUpdate = async (data) => {
        setLoading(true)
        const response = await api.put(`diets/api/supplements/${id}/`, data)

        if (response.status === 200) {
            toast.success('¡Editado correctamente!')
            setSupplement(response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const supplement = await api.get(`diets/api/supplements/${id}`)

                setSupplement(supplement.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, id])

    if (loading) {
        return (
            <div className='centered-flex-container'>
                <div className='loader' />
            </div>
        )
    } else {
        if (supplement) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {supplement.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateSupplement
                                handleUpdate={handleUpdate}
                                name={supplement.name}
                                description={supplement.description}
                                kg={supplement.kg_presentation} />
                            <DeleteModal handleDelete={handleDelete} object='este suplemento' />
                        </div>
                    </div>

                    <section>
                        <div className='flex-column'>
                            <div>
                                <strong> Descripción </strong>
                                <p>{supplement.description}</p>
                            </div>
                            <div>
                                <strong> Presentación </strong>
                                <p>{supplement.kg_presentation} KG</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='centered-flex-container'>
                            <h2 className='flex-3 fit'>
                                Historial de Precios
                            </h2>
                            {supplement.prices.length ?
                                <button
                                    onClick={() => navigate('agregar_precio')}
                                    className='fit flex-1 navlink-button flex-container no-decoration'>
                                    <HiPlus />
                                    &nbsp;
                                    <p>Nuevo precio</p>
                                </button>
                                :
                                null
                            }

                        </div>
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
                                    {supplement.prices.map((price, key) =>
                                        <tr key={key}>
                                            <td>{price.price} colones</td>
                                            <td>{new Date(price.date).toLocaleString('es-ES', options)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            )
        }
    }
}