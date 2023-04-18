import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


const headers = { action: '', badge_number: 'Identificador', origin: 'Procedencia', sex: 'Sexo', breed: 'Raza' }

export default function CreateGroup() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [sector, setSector] = useState('')

    const [sectors, setSectors] = useState([])
    const [animals, setAnimals] = useState([])

    function setChecked(event, index) {
        const animalList = [...animals]
        animalList[index].isChecked = event.target.checked
        setAnimals(animalList)
    }

    function createGroup(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            name: name,
            sector: sector,
            animals: animals.filter(animal => animal.isChecked)
        }

        const url = baseURL + 'api/group/'
        fetch(url, {
            method: 'POST',
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
            .then(() => {
                toast.success('¡Creado correctamente!')
                setLoading(false)
                navigate(-1)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const animalURL = baseURL + `api/animal/?group__isnull=${true}`
        const sectorURL = baseURL + `api/sector/?has_group=${false}`
        Promise.all([
            fetch(animalURL).then(response => response.json()),
            fetch(sectorURL).then(response => response.json())
        ])
            .then(([animalData, sectorData]) => {
                animalData = animalData.map((animal) => ({ ...animal, isChecked: false }))
                setAnimals(animalData)
                setSectors(sectorData)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate])

    return (
        <main>
            <section>
                <h1>Nuevo grupo de animales</h1>
                <form onSubmit={createGroup}>
                    <div className='grid'>
                        <label htmlFor='name'>
                            Nombre del grupo
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre del grupo'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required />
                        </label>
                        <label htmlFor='sector'>
                            Sector
                            <select
                                id='sector'
                                name='sector'
                                value={sector}
                                onChange={(e) => { setSector(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                {sectors.map((sector, key) =>
                                    <option key={key} value={sector.id}>{sector.name}</option>
                                )}
                            </select>
                        </label>
                    </div>
                    <div>
                        {loading ?
                            <div className='centered-flex-container'>
                                <div className='loader' />
                            </div>
                            :
                            <>
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
                            </>
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