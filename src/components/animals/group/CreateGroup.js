import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { HiCheck } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


const headers = { action: '', badge_number: 'Identificador', origin: 'Procedencia', sex: 'Sexo', breed: 'Raza' }

export default function CreateGroup() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [sectors, setSectors] = useState([])
    const [animals, setAnimals] = useState([])

    function setChecked(event, index) {
        const animalList = [...animals]
        animalList[index].isChecked = event.target.checked
        setAnimals(animalList)
    }

    const onSubmit = handleSubmit(async data => {
        setLoading(true)

        data.animals = animals.filter(animal => animal.isChecked)
        const response = await api.post('animals/api/groups/', data)

        if (response.status === 201) {
            toast.success('¡Creado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    })

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const animals = await api.get(`animals/api/animals/?group__isnull=${true}`)
                const sectors = await api.get(`animals/api/sectors/?has_group=${false}`)

                const animalsList = animals.data.map((animal) => ({ ...animal, isChecked: false }))
                setAnimals(animalsList)
                setSectors(sectors.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate])

    if (loading) {
        return <Loading />
    } else {
        return (
            <main className='container'>
                <section>
                    <h1>Nuevo grupo de animales</h1>
                    <form onSubmit={onSubmit}>
                        <div className='grid'>
                            <label htmlFor='name'>
                                Nombre del grupo
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Nombre del grupo'
                                    aria-invalid={errors.name ? 'true' : ''}
                                    {...register('name', { required: true })} />
                            </label>
                            <label htmlFor='sector'>
                                Sector
                                <select
                                    id='sector'
                                    name='sector'
                                    aria-invalid={errors.sector ? 'true' : ''}
                                    {...register('sector', { required: true })}>
                                    <option value='' disabled>Seleccionar</option>
                                    {sectors.map((sector, key) =>
                                        <option key={key} value={sector.id}>{sector.name}</option>
                                    )}
                                </select>
                            </label>
                        </div>
                        <div>

                            {animals && animals.length ?
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
                                            {animals.map((animal, index) =>
                                                <tr
                                                    key={index}>
                                                    <td>
                                                        <input
                                                            type='checkbox'
                                                            onChange={(e) => { setChecked(e, index) }}
                                                            id='animal_check'
                                                            name='animal_check'
                                                            value={animal.id} />
                                                    </td>
                                                    <td>{animal.badge_number}</td>
                                                    {animal.origin === 'S' ? <td>Subasta</td> : <td>Finca</td>}
                                                    <td>{animal.sex}</td>
                                                    <td>{animal.breed}</td>
                                                </tr>

                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay animales sin grupo</h4>
                            }
                        </div>
                        <div className='centered-flex-container'>
                            <div className='flex-3' />
                            <button className='flex-1 navlink-button flex-container no-decoration'>
                                <HiCheck />
                                &nbsp;
                                <p>Completar</p>
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        )
    }
}