import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { HashLoader } from 'react-spinners'

import DeleteModal from '../../DeleteModal'
import UpdateSector from './UpdateSector'
import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


export default function SectorDetail() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [sector, setSector] = useState()

    const { id } = useParams()

    const handleDelete = async () => {
        setLoading(true)
        const response = await api.delete(`animals/api/sectors/${id}`)

        if (response.status === 204) {
            toast.success('Eliminado correctamente!')
            setLoading(false)
            navigate(-1) 
        }
    }

    const handleUpdate = async (data) => {
        setLoading(true)
        const response = await api.put(`animals/api/sectors/${id}/`, data)

        if (response.status === 200) {
            toast.success('¡Editado correctamente!')
            setSector(response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const sector = await api.get(`animals/api/sectors/${id}`)

                setSector(sector.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, id])

    if (loading) {
        return (
            <div className='loader-container'>
                <HashLoader color={spinnerColor} loading={loading} />
            </div>
        )
    } else {
        if (sector) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {sector.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateSector
                                handleUpdate={handleUpdate}
                                name={sector.name}
                                area={sector.area} />
                            <DeleteModal handleDelete={handleDelete} title='este sector' />
                        </div>
                    </div>

                    <section>
                        <div className='flex-column'>
                            <div>
                                <strong> Área (Tamaño del terreno) </strong>
                                <p> {sector.area} </p>
                            </div>
                        </div>
                    </section>
                </main>
            )
        }
    }
}