import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'
import { toast } from 'react-hot-toast'

import useAxios from '../utils/useAxios'
import Loading from '../components/Loading'


const costHeaders = { name: 'Nombre', type: 'Tipo', cost: 'Costo' }
const categoryHeaders = { id: 'ID', name: 'Categoría' }

export default function Costs() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [costs, setCosts] = useState()
    const [categories, setCategories] = useState()

    const [costLength, setCostLength] = useState()
    const [categoriesLength, setCategoriesLength] = useState()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const costs = await api.get('costs/api/costs/')
                const categories = await api.get('costs/api/categories/')

                setCostLength(costs.data.length)
                setCategoriesLength(categories.data.length)

                let costsList = costs.data
                if (costs.data.length > 5)
                    costsList = costs.data.slice(0, 5);
                setCosts(costsList)

                let categoriesList = categories.data
                if (categories.data.length > 5)
                    categoriesList = categories.data.slice(0, 5);
                setCategories(categoriesList)

                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <Loading />
    } else {
        return (
            <main className='container'>
                <section>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit clickable' onClick={() => navigate('lista')}>
                            Costos
                        </h1>
                        <button
                            onClick={() => navigate('agregar_costo')}
                            className='fit flex-1 navlink-button flex-container no-decoration'>
                            <HiPlus />
                            &nbsp;
                            <p>Nuevo costo</p>
                        </button>
                    </div>
                    <div>
                        {costs && costs.length ?
                            <div>
                                <table>
                                    <thead>
                                        <tr key='headers'>
                                            {Object.keys(costHeaders).map((key) =>
                                                <th key={key}>{costHeaders[key]}</th>
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
                                                {cost.type === 'i' ? <td>Inversión</td> : <td>Gasto</td>}
                                                <td>{cost.cost}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                {costLength > 5 ?
                                    <div className='centered-flex-container'>
                                        <button onClick={() => navigate('lista')} className='fit'>
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
                    </div>
                </section>
                <section>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit clickable' onClick={() => navigate('categorias/lista')}>
                            Categorías
                        </h1>
                        <button
                            onClick={() => navigate('agregar_categoria')}
                            className='fit flex-1 navlink-button flex-container no-decoration'>
                            <HiPlus />
                            &nbsp;
                            <p>Nueva categoría</p>
                        </button>
                    </div>
                    <div>
                        {categories && categories.length ?
                            <div>
                                <table>
                                    <thead>
                                        <tr key='headers'>
                                            {Object.keys(categoryHeaders).map((key) =>
                                                <th key={key}>{categoryHeaders[key]}</th>
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
                                {categoriesLength > 5 ?
                                    <div className='centered-flex-container'>
                                        <button onClick={() => navigate('categorias/lista')} className='fit '>
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
                    </div>
                </section>
            </main>
        )
    }
}