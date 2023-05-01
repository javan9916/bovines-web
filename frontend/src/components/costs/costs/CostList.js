import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import Pagination from '../../Pagination'
import useAxios from '../../../utils/useAxios'


const headers = { name: 'Nombre', type: 'Tipo', category: 'Categoría', date: 'Fecha', cost: 'Costo' }
let pageSize = 10

export default function CostList() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [costs, setCosts] = useState()
    const [categories, setCategories] = useState([])
    const [response, setResponse] = useState()

    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState()
    const [order, setOrder] = useState('id')

    const [type, setType] = useState('')
    const [category, setCategory] = useState('')

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
                const costs = await api.get(`costs/api/costs/?ordering=${order}&limit=${pageSize}&offset=${offset}&type=${type}&category=${category}`)
                const categories = await api.get('costs/api/categories/')

                setResponse(costs.data)
                setCosts(costs.data.results)
                setCategories(categories.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, order, type, category, currentPage, offset])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Costos
                    </h1>
                </div>
                <div className='grid'>
                    <label htmlFor='type'>
                        Tipo de costo
                        <select
                            id='type'
                            name='type'
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                            required>
                            <option value=''>Seleccionar</option>
                            <option value='I'>Inversión</option>
                            <option value='G'>Gasto</option>
                        </select>
                    </label>

                    <label htmlFor='category'>
                        Categoría del costo
                        <select
                            id='category'
                            name='category'
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            required>
                            <option value=''>Seleccionar</option>
                            {categories.map((category, key) =>
                                <option key={key} value={category.id}>{category.name}</option>
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
                            {costs && costs.length ?
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
                                            {costs.map((cost, key) =>
                                                <tr
                                                    key={key}
                                                    onClick={() => {
                                                        navigate(`/costos/${cost.id}`)
                                                    }}>
                                                    <td>{cost.name}</td>
                                                    {cost.type === 'I' ? <td>Inversión</td> : <td>Gasto</td>}
                                                    {cost.category ? <td>{cost.category.name}</td> : <td>Sin categoría</td>}
                                                    <td>{cost.date}</td>
                                                    <td>{cost.cost}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <h4 className='centered-flex-container'>No hay costos en la base de datos</h4>
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