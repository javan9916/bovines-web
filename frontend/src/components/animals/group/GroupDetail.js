import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'
import UpdateGroup from './UpdateGroup'


const headers = { badge_number: 'Identificador', origin: 'Procedencia', sex: 'Sexo', breed: 'Raza' }

export default function GroupDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const [group, setGroup] = useState()
    const [animals, setAnimals] = useState()

    const { id } = useParams()

    function deleteGroup() {
        const url = baseURL + `api/group/${id}`
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

    function updateGroup(updateData) {
        setLoading(true)

        const { name, sector, animals } = updateData
        const data = {
            name: name,
            sector: sector,
            animals: animals.filter(animal => animal.isChecked)
        }

        const url = baseURL + `api/group/${id}/`
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
                setGroup(data)
                setLoading(false)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const groupURL = baseURL + `api/group/${id}`
        const animalURL = baseURL + `api/animal/?group__isnull_or_equal=${id}`
        Promise.all([
            fetch(groupURL).then(response => response.json()),
            fetch(animalURL).then(response => response.json())
        ])
            .then(([groupData, animalData]) => {
                setGroup(groupData)

                setAnimals(animalData.map(animal => {
                    const checked = animal.group === parseInt(id)
                    return { ...animal, isChecked: checked }
                }))
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
        if (group) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {group.name} ({group.sector.name})
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateGroup
                                handleUpdate={updateGroup}
                                name={group.name}
                                sector={group.sector.id}
                                animals={animals} />
                            <DeleteModal handleDelete={deleteGroup} title='este grupo' />
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