import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { baseURL } from '../../../shared'
import Pagination from '../../Pagination'


const headers = { name: 'Nombre', area: 'Área' }
let pageSize = 10

export default function SectorList() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [sectors, setSectors] = useState()
    const [response, setResponse] = useState()

    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState()
    const [order, setOrder] = useState('id')

    function handleOrdering(value) {
        order.includes('-') ? setOrder(value) : setOrder(`-${value}`)
    }

    function handlePageChange(value) {
        setOffset((value - 1) * pageSize)
        setCurrentPage(value)
    }

    useEffect(() => {
        setLoading(true)

        const url = baseURL + `animals/api/sectors/?ordering=${order}&limit=${pageSize}&offset=${offset}`
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
                setResponse(data)
                setSectors(data.results)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate, order, currentPage, offset])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Sectores
                    </h1>
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
                                                {Object.keys(headers).map((key) =>
                                                    <th key={key}
                                                        onClick={() => { handleOrdering(String(key)) }}>
                                                        {headers[key]}
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectors.map((sector, key) =>
                                                <tr
                                                    key={key}
                                                    onClick={() => {
                                                        navigate(`/animales/sectores/${sector.id}`)
                                                    }}>
                                                    <td>{sector.name}</td>
                                                    <td>{sector.area}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay sectores en la base de datos</h4>
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