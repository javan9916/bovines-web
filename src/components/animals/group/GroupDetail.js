import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import DeleteModal from '../../DeleteModal'
import UpdateGroup from './UpdateGroup'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


const headers = { badge_number: 'Identificador', origin: 'Procedencia', sex: 'Sexo', breed: 'Raza' }

export default function GroupDetail() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const [group, setGroup] = useState()
    const [animals, setAnimals] = useState()

    const { id } = useParams()

    const handleDelete = async () => {
        setLoading(true)
        const response = await api.delete(`animals/api/groups/${id}/`)

        if (response.status === 204) {
            toast.success('Eliminado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    }

    const handleUpdate = async (data) => {
        setLoading(true)
        data.animals = animals.filter(animal => animal.isChecked)
        const response = await api.put(`animals/api/groups/${id}/`, data)

        if (response.status === 200) {
            toast.success('¡Editado correctamente!')
            setGroup(response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const animals = await api.get(`animals/api/animals/?group__isnull_or_equal=${id}`)
                const group = await api.get(`animals/api/groups/${id}`)


                setGroup(group.data)

                setAnimals(animals.data.map(animal => {
                    const checked = animal.group === parseInt(id)
                    return { ...animal, isChecked: checked }
                }))
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, id])

    if (loading) {
        return <Loading />
    } else {
        if (group) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {group.name} ({group.sector.name})
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateGroup
                                handleUpdate={handleUpdate}
                                name={group.name}
                                sector={group.sector.id}
                                animals={animals} />
                            <DeleteModal handleDelete={handleDelete} title='este grupo' />
                        </div>
                    </div>
                    <section>
                        <h2>Animales</h2>
                        {group.animals && group.animals.length ?
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
                                        {group.animals.map((animal, key) =>
                                            <tr
                                                key={key}
                                                onClick={() => {
                                                    navigate(`/animales/${animal.id}`)
                                                }}>
                                                <td>{animal.badge_number}</td>
                                                {animal.origin === 'S' ? <td>Subasta</td> : <td>Finca</td>}
                                                {animal.sex === 'H' ? <td>Hembra</td> : <td>Macho</td>}
                                                <td>{animal.breed}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <h4 className='centered-flex-container'>No hay animales en este grupo</h4>
                        }
                    </section>
                </main>
            )
        }
    }
}