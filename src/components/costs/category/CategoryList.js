import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { HashLoader } from 'react-spinners'

import Pagination from '../../Pagination'
import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


const headers = { id: 'ID', name: 'Nombre' }
let pageSize = 10

export default function CategoryList() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])
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
                const categories = await api.get(`costs/api/categories/?ordering=${order}&limit=${pageSize}&offset=${offset}`)

                setResponse(categories.data)
                setCategories(categories.data.results)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, order, currentPage, offset])

    if (loading) {
        return (
            <div className='loader-container'>
                <HashLoader color={spinnerColor} loading={loading} />
            </div>
        )
    } else {
        return (
            <main className='container'>
                <section>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            Categorías
                        </h1>
                    </div>
                    <div>
                        {loading ?
                            <div className='centered-flex-container'>
                                <div className='loader' />
                            </div>
                            :
                            <>
                                {categories && categories.length ?
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
                                                {categories.map((category, key) =>
                                                    <tr
                                                        key={key}
                                                        onClick={() => {
                                                            navigate(`/costos/categorias/${category.id}`)
                                                        }}>
                                                        <td>{category.id}</td>
                                                        <td>{category.name}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <h4 className='centered-flex-container'>No hay categorías en la base de datos</h4>
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
}