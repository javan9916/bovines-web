import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'


export default function CostDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [cost, setCost] = useState()

    const { id } = useParams()

    function deleteCost() {
        const url = baseURL + `costs/api/costs/${id}`
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

    useEffect(() => {
        setLoading(true)

        const url = baseURL + `costs/api/costs/${id}`
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
                setCost(data)
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
        if (cost) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {cost.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <DeleteModal handleDelete={deleteCost} title='este costo' />
                        </div>
                    </div>

                    <section>
                        <div className='flex-column'>
                            <div>
                                <strong> Tipo </strong>
                                {cost.type === 'i' ? <p>Inversión</p> : <p>Gasto</p>}
                            </div>
                            <div>
                                <strong> Categoría </strong>
                                {cost.category ? <p>{cost.category.name}</p> : <p>Sin categoría</p>}
                            </div>
                            <div>
                                <strong> Costo total </strong>
                                <p>{cost.cost} colones</p>
                            </div>
                            <div>
                                <strong> Fecha de la compra </strong>
                                {cost.date ? <p>{new Date(cost.date).toLocaleDateString('es-MX')}</p> : <p>Sin fecha</p>}
                            </div>
                        </div>
                    </section>
                </main>
            )
        }
    }
}