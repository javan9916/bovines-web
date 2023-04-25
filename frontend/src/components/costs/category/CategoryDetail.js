import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'

export default function CategoryDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const [category, setCategory] = useState()

    const { id } = useParams()

    function deleteCategory() {
        const url = baseURL + `costs/api/categories/${id}`
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

        const url = baseURL + `costs/api/categories/${id}`
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
                setCategory(data)
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
        if (category) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {category.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <DeleteModal handleDelete={deleteCategory} title='esta categoría' />
                        </div>
                    </div>
                </main>
            )
        }
    }
}