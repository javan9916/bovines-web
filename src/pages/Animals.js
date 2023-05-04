import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { HiPlus } from 'react-icons/hi'
import { toast } from 'react-hot-toast'
import useAxios from '../utils/useAxios'


const animalHeaders = { badge_number: 'Identificador', origin: 'Procedencia', sex: 'Sexo', breed: 'Raza' }
const sectorHeaders = { name: 'Nombre', area: 'Área' }

export default function Animals() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [animals, setAnimals] = useState([])
    const [sectors, setSectors] = useState([])
    const [groups, setGroups] = useState([])

    const [animalLength, setAnimalLength] = useState()
    const [sectorLength, setSectorLength] = useState()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const animals = await api.get('animals/api/animals/')
                const sectors = await api.get('animals/api/sectors/')
                const groups = await api.get('animals/api/groups/')

                setAnimalLength(animals.data.length)
                setSectorLength(sectors.data.length)

                let animalsList = animals.data
                if (animals.data.length > 5)
                    animalsList = animals.data.slice(0, 5);
                setAnimals(animalsList)

                let sectorsList = sectors.data
                if (sectors.data.length > 5)
                    sectorsList = sectors.data.slice(0, 5);
                setSectors(sectorsList)

                setGroups(groups.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Animales
                    </h1>
                    <button
                        onClick={() => navigate('agregar_animal')}
                        className='fit flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nuevo animal</p>
                    </button>
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
                                                {Object.keys(animalHeaders).map((key) =>
                                                    <th key={key}>{animalHeaders[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {animals.map((animal, key) =>
                                                <tr
                                                    key={key}
                                                    onClick={() => {
                                                        navigate(`/animales/${animal.id}`)
                                                    }}>
                                                    <td>{animal.badge_number}</td>
                                                    {animal.origin === 'S' ? <td>Subasta</td> : <td>Finca</td>}
                                                    <td>{animal.sex}</td>
                                                    <td>{animal.breed}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {animalLength > 5 ?
                                        <div className='centered-flex-container'>
                                            <button onClick={() => navigate('lista')} className='fit '>
                                                Ver toda la lista
                                            </button>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay animales en la base de datos</h4>
                            }
                        </>
                    }
                </div>
            </section>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Grupos de animales
                    </h1>
                    <button
                        onClick={() => navigate('agregar_grupo')}
                        className='fit flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nuevo grupo</p>
                    </button>
                </div>
                <div className='grid'>
                    {loading ?
                        <div className='centered-flex-container'>
                            <div className='loader' />
                        </div>
                        :
                        <>
                            {groups && groups.length ?
                                <>
                                    {groups.map((group, key) =>
                                        <div key={key} className='card' onClick={() => navigate(`grupos/${group.id}`)}>
                                            <div className='card-content centered-flex-container no-decoration'>
                                                <h4>{group.name}</h4>
                                            </div>
                                        </div>
                                    )}
                                </>
                                :
                                <h4 className='centered-flex-container'>No hay grupos en la base de datos</h4>
                            }
                        </>
                    }
                </div>
            </section>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Sectores
                    </h1>
                    <button
                        onClick={() => navigate('agregar_sector')}
                        className='fit flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nuevo sector</p>
                    </button>
                </div>
                <div>
                    {loading ?
                        <div className='centered-flex-container'>
                            <div className='loader' />
                        </div>
                        :
                        <>
                            {sectors && sectors.length ?
                                <div>

                                    <table>
                                        <thead>
                                            <tr key='headers'>
                                                {Object.keys(sectorHeaders).map((key) =>
                                                    <th key={key}>{sectorHeaders[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectors.map((sector, key) =>
                                                <tr key={key}
                                                    onClick={() => {
                                                        navigate(`/animales/sectores/${sector.id}`)
                                                    }}>
                                                    <td>{sector.name}</td>
                                                    <td>{sector.area}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {sectorLength > 5 ?
                                        <div className='centered-flex-container'>
                                            <button onClick={() => navigate('sectores/lista')} className='fit '>
                                                Ver toda la lista
                                            </button>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay sectores en la base de datos</h4>
                            }
                        </>
                    }
                </div>
            </section>
        </main>
    )
}