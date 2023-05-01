import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import DeleteModal from '../../DeleteModal'
import useAxios from '../../../utils/useAxios'

export default function CategoryDetail() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const [category, setCategory] = useState()

    const { id } = useParams()

    const handleDelete = async () => {
        setLoading(true)
        const response = await api.delete(`costs/api/categories/${id}`)

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
                const category = await api.get(`costs/api/categories/${id}`)

                setCategory(category.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className='centered-flex-container'>
                <div className='loader' />
            </div>
        )
    } else {
        if (category) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {category.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <DeleteModal handleDelete={handleDelete} title='esta categoría' />
                        </div>
                    </div>
                </main>
            )
        }
    }
}