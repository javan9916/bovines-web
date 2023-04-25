import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiPlus } from 'react-icons/hi'
import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'
import UpdateSupplement from './UpdateSupplement'


const headers = { price: 'Precio', date: 'Fecha de registro' }
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export default function SupplementDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const [supplement, setSupplement] = useState()

    function deleteSupplement() {
        const url = baseURL + `diets/api/supplements/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404)
                        navigate('/404')
                    else
                        navigate('/500')
                }
                toast.success('¡Eliminado correctamente!')
                navigate(-1)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    function updateSupplement(updateData) {
        setLoading(true)

        const { name, description, kg } = updateData
        const data = {
            name: name,
            description: description,
            kg_presentation: kg
        }

        const url = baseURL + `diets/api/supplements/${id}/`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404)
                        navigate('/404')
                    else
                        navigate('/500')
                }
                return response.json()
            })
            .then((data) => {
                toast.success('¡Editado correctamente!')
                setSupplement(data)
                setLoading(false)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const url = baseURL + `diets/api/supplements/${id}`
        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404)
                        navigate('/404')
                    else
                        navigate('/500')
                }
                return response.json()
            })
            .then((data) => {
                setSupplement(data)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
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
                                handleUpdate={updateSupplement}
                                name={supplement.name}
                                description={supplement.description}
                                kg={supplement.kg_presentation} />
                            <DeleteModal handleDelete={deleteSupplement} object='este suplemento' />
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