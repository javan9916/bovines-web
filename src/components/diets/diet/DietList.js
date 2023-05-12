import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import Pagination from '../../Pagination'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


const headers = { name: 'Nombre', total_cost: 'Costo total' }
let pageSize = 10

export default function DietList() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [diets, setDiets] = useState()
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
                const diets = await api.get(`diets/api/diets/?ordering=${order}&limit=${pageSize}&offset=${offset}`)

                setResponse(diets.data)
                setDiets(diets.data.results)
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
                            Dietas
                        </h1>
                    </div>
                    <div>

                        {diets && diets.length ?
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
                                        {diets.map((diet, key) =>
                                            <tr key={key}>
                                                <td>{diet.name}</td>
                                                <td>{diet.total_cost} colones</td>
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