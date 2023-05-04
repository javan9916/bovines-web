import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import DeleteModal from '../../DeleteModal'
import useAxios from '../../../utils/useAxios'


export default function CostDetail() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [cost, setCost] = useState()

    const { id } = useParams()

    const handleDelete = async () => {
        setLoading(true)
        const response = await api.delete(`costs/api/costs/${id}`)

        if (response.status === 204) {
            toast.success('Eliminado correctamente!')
            setLoading(false)
            navigate(-1) 
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const cost = await api.get(`costs/api/costs/${id}`)

                setCost(cost.data)
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
        if (cost) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {cost.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <DeleteModal handleDelete={handleDelete} title='este costo' />
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