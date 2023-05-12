import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import Pagination from '../../Pagination'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


const headers = { name: 'Nombre', kg_presentation: 'Presentación' }
let pageSize = 10

export default function SupplementList() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [supplements, setSupplements] = useState()
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
        const fetchData = async () => {
            try {
                const supplements = await api.get(`diets/api/supplements/?ordering=${order}&limit=${pageSize}&offset=${offset}`)

                setResponse(supplements.data)
                setSupplements(supplements.data.results)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, order, currentPage, offset])

    if (loading) {
        return <Loading />
    } else {
        return (
            <main className='container'>
                <section>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            Suplementos
                        </h1>
                    </div>
                    <div>
                        {supplements && supplements.length ?
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
                                        {supplements.map((supplement, key) =>
                                            <tr key={key}>
                                                <td>{supplement.name}</td>
                                                <td>{supplement.kg_presentation} KG</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <h4 className='centered-flex-container'>No hay dietas en la base de datos</h4>
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
            </main>
        )
    }
}