import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'
import UpdateSector from './UpdateSector'


export default function SectorDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [sector, setSector] = useState()

    const { id } = useParams()

    function deleteSector() {
        const url = baseURL + `api/sector/${id}`
        fetch(url, { method: 'DELETE' })
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

    function updateSector(updateData) {
        setLoading(true)

        const { name, area } = updateData
        const data = {
            name: name,
            area: area
        }

        const url = baseURL + `api/sector/${id}/`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
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
                setSector(data)
                setLoading(false)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const url = baseURL + `api/sector/${id}`
        fetch(url)
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
                setSector(data)
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
        if (sector) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {sector.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateSector
                                handleUpdate={updateSector}
                                name={sector.name}
                                area={sector.area} />
                            <DeleteModal handleDelete={deleteSector} title='este sector' />
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