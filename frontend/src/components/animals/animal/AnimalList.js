import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { baseURL, ids } from '../../../shared'
import Pagination from '../../Pagination'


const headers = { badge_number: 'Identificador', sex: 'Sexo', breed: 'Raza', origin: 'Procedencia', value: 'Valor', phase: 'Etapa' }
let pageSize = 10

export default function AnimalList() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [animals, setAnimals] = useState()
    const [response, setResponse] = useState()

    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState()
    const [order, setOrder] = useState('id')

    const [origin, setOrigin] = useState('')
    const [sex, setSex] = useState('')
    const [phase, setPhase] = useState('')

    function handleOrdering(value) {
        order.includes('-') ? setOrder(value) : setOrder(`-${value}`)
    }

    function handlePageChange(value) {
        setOffset((value - 1) * pageSize)
        setCurrentPage(value)
    }

    useEffect(() => {
        setLoading(true)

        const url = baseURL + `api/animal/?ordering=${order}&limit=${pageSize}&offset=${offset}&origin=${origin}&sex=${sex}&phase=${phase}`
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${localStorage.getItem('access')}`
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
                setResponse(data)
                setAnimals(data.results)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate, order, sex, origin, phase, currentPage, offset])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Animales
                    </h1>
                </div>
                <div className='grid'>
                    <label htmlFor='origin'>
                        Procedencia del animal
                        <select
                            id='origin'
                            name='origin'
                            value={origin}
                            onChange={(e) => { setOrigin(e.target.value) }}
                            required>
                            <option value=''>Seleccionar</option>
                            <option value='F'>Finca</option>
                            <option value='S'>Subasta</option>
                        </select>
                    </label>

                    <label htmlFor='sex'>
                        Sexo del animal
                        <select
                            id='sex'
                            name='sex'
                            value={sex}
                            onChange={(e) => { setSex(e.target.value) }}
                            required>
                            <option value=''>Seleccionar</option>
                            <option value='M'>Macho</option>
                            <option value='H'>Hembra</option>
                        </select>
                    </label>

                    <label htmlFor='phase'>
                        Etapa del animal
                        <select
                            id='phase'
                            name='phase'
                            value={phase}
                            onChange={(e) => { setPhase(e.target.value) }}
                            required>
                            <option value=''>Seleccionar</option>
                            <option value={ids.DEV_ID}>Desarrollo</option>
                            <option value={ids.GAINING_ID}>Engorde</option>
                            <option value={ids.ENDING_ID}>Finalización</option>
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
                                                    <th key={key}
                                                        onClick={() => { handleOrdering(String(key)) }}>
                                                        {headers[key]}
                                                    </th>
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
                                                    {animal.sex === 'H' ? <td>Hembra</td> : <td>Macho</td>}
                                                    <td>{animal.breed}</td>
                                                    {animal.origin === 'S' ? <td>Subasta</td> : <td>Finca</td>}
                                                    <td>{animal.value} colones</td>
                                                    {animal.phase ? <td>{animal.phase.name}</td> : <td>Sin pesajes</td>}
                                                    
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay animales en la base de datos</h4>
                            }
                        </>
                    }
                </div>
                {response ?
                    <div className='flex-centered-container'>
                        <Pagination
                            className='pagination-bar'
                            currentPage={currentPage}
                            totalCount={response.count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    :
                    null
                }
            </section>
        </main >
    )
}