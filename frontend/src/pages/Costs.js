import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { HiPlus } from 'react-icons/hi'
import { baseURL } from '../shared'


const costHeaders = { name: 'Nombre', type: 'Tipo', cost: 'Costo' }
const categoryHeaders = { id: 'ID', name: 'Categoría' }

export default function Costs() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [costs, setCosts] = useState()
    const [costLength, setCostLength] = useState()

    const [categories, setCategories] = useState()
    const [categoriesLength, setCategoriesLength] = useState()

    useEffect(() => {
        setLoading(true)

        const authHeaders = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        }

        const costURL = baseURL + 'costs/api/costs/'
        const categoryURL = baseURL + 'costs/api/categories/'
        Promise.all([
            fetch(costURL, authHeaders).then(response => response.status === 401 ? navigate('/login') : response.json()),
            fetch(categoryURL, authHeaders).then(response => response.status === 401 ? navigate('/login') : response.json())
        ])
            .then(([costData, categoryData]) => {
                setCostLength(costData.length)
                if (costData.length)
                    costData.slice(0, 5)
                setCosts(costData)

                setCategoriesLength(categoryData.length)
                if (categoryData.length)
                    categoryData.slice(0, 5)
                setCategories(categoryData)

                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
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
                        </>
                    }
                </div>
            </section>
        </main>
    )
}