import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiPlus } from 'react-icons/hi'
import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'
import UpdateAnimal from './UpdateAnimal'

import humanizeDuration from 'humanize-duration'


const headers = { weight: 'Peso', date: 'Fecha de registro', gpd: 'GPD', gpt: 'GPT', fca: 'FCA' }

export default function AnimalDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [animal, setAnimal] = useState()
    const [group, setGroup] = useState()

    const { id } = useParams()

    function deleteAnimal() {
        const url = baseURL + 'api/animal/' + id
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

    function updateAnimal(updateData) {
        setLoading(true)

        const { sex, breed, origin, cost_per_kg } = updateData
        const data = { sex, breed, origin, cost_per_kg }

        const url = baseURL + `api/animal/${id}/`
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
                setAnimal(data)
                setLoading(false)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    function doDates(weights) {
        weights.forEach(weight => {
            let weightDate = new Date(weight.date)
            let nowDate = new Date()
            const diffTime = Math.abs(nowDate - weightDate)

            weight.milliseconds = diffTime
            weight.date = weightDate
        })
    }

    useEffect(() => {
        setLoading(true)

        const animalURL = baseURL + `api/animal/${id}`
        const groupURL = baseURL + `api/group/?animals=${id}`
        Promise.all([
            fetch(animalURL).then(response => response.json()),
            fetch(groupURL).then(response => response.json())
        ])
            .then(([animalData, groupData]) => {
                console.log(animalData)
                setAnimal(animalData)
                doDates(animalData.weights)

                if (groupData.length)
                    setGroup(groupData[0])
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
        if (animal) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            Animal #{animal.badge_number}
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateAnimal
                                handleUpdate={updateAnimal}
                                sex={animal.sex}
                                breed={animal.breed}
                                origin={animal.origin}
                                cost_per_kg={animal.cost_per_kg}
                                weights={animal.weights} />
                            <DeleteModal handleDelete={deleteAnimal} title='este animal' />
                        </div>
                    </div>

                    <section>
                        <h2>Información general</h2>
                        <div className='flex-column'>
                            <div className='grid'>
                                <div>
                                    <strong> Procedencia </strong>
                                    {animal.origin === 'F' ? <p>Finca</p> : <p>Subasta</p>}
                                </div>
                                <div>
                                    <strong> Grupo </strong>
                                    {animal.group && group ?
                                        <p>{group.name}</p>
                                        :
                                        <p className='danger-text'>No pertenece a ningún grupo</p>
                                    }
                                </div>
                            </div>

                            <div className='grid'>
                                <div><strong> Raza </strong> <p> {animal.breed} </p></div>
                                <div>
                                    <strong> Sexo </strong>
                                    {animal.sex === 'H' ? <p>Hembra</p> : <p>Macho</p>}
                                </div>
                            </div>
                            <div className='grid'>
                                <div>
                                    <strong> Valor inicial del animal </strong>
                                    {animal.cost ?
                                        <p>{animal.cost.cost}</p>
                                        :
                                        <p className='danger-text'>Debe registrar los pesajes iniciales</p>
                                    }
                                </div>
                                <div>
                                    <strong> Valor actual del animal </strong>
                                    {animal.value ?
                                        <p>{animal.value}</p>
                                        :
                                        <p className='danger-text'>Debe registrar los pesajes iniciales</p>
                                    }
                                </div>
                                <div>
                                    <strong> Precio pagado por kilo </strong>
                                    <p> {animal.cost_per_kg} </p>
                                </div>
                            </div>
                            <strong> Etapa actual </strong>
                            {animal.phase ?
                                <p>{animal.phase.name}</p>
                                :
                                <p className='danger-text'>Debe registrar los pesajes iniciales</p>
                            }

                        </div>
                    </section>
                    <section>
                        <div className='centered-flex-container'>
                            <h2 className='flex-3 fit'>
                                Pesajes
                            </h2>
                            {animal.weights.length ?
                                <button
                                    onClick={() => navigate('agregar_pesaje')}
                                    className='fit flex-1 navlink-button flex-container no-decoration'>
                                    <HiPlus />
                                    &nbsp;
                                    <p>Nuevo pesaje</p>
                                </button>
                                :
                                null
                            }

                        </div>
                        <div>
                            {
                                !animal.weights.length ?
                                    <button onClick={() => navigate('pesajes_iniciales')} className='fit'>
                                        Agregar pesajes iniciales
                                    </button>
                                    :
                                    <table>
                                        <thead>
                                            <tr key='headers'>
                                                {Object.keys(headers).map((key) =>
                                                    <th key={key}>{headers[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {animal.weights.map((weight, key) => key !== 0 && key !== 1 ?
                                                <tr key={key}>
                                                    <td>{weight.weight} KG</td>
                                                    <td className='flex-container'>
                                                        {weight.date.toLocaleDateString('es-MX')}
                                                        <div className='detail'>
                                                            &nbsp;&nbsp;hace&nbsp;
                                                            {humanizeDuration(weight.milliseconds, { language: 'es' }).split(',')[0]}
                                                        </div>

                                                    </td>
                                                    <td>{weight.gpd}</td>
                                                    <td>{weight.gpt}</td>
                                                    <td>{weight.fca}</td>
                                                </tr>
                                                :
                                                <tr key={key}>
                                                    <td>{weight.weight} KG</td>
                                                    <td className='flex-container'>
                                                        {weight.date.toLocaleDateString('es-MX')}
                                                        <div className='detail'>
                                                            &nbsp;&nbsp;hace&nbsp;
                                                            {humanizeDuration(weight.milliseconds, { language: 'es' }).split(',')[0]}
                                                        </div>

                                                    </td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </section>
                </main>
            )
        }
    }
}