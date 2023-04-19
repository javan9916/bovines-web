import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { HiPlus } from 'react-icons/hi'
import { baseURL } from '../shared'


const headers = { name: 'Nombre', type: 'Tipo', cost: 'Costo' }

export default function Costs() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [costs, setCosts] = useState()
    const [costLength, setCostLength] = useState()

    useEffect(() => {
        setLoading(true)

        const url = baseURL + 'api/cost/'
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404)
                        navigate('/404')
                    else if (response.status === 401)
                        navigate('/login')
                    else
                        navigate('/500')
                }
                return response.json()
            })
            .then((data) => {
                setCostLength(data.length)

                if (data.length > 5)
                    data = data.slice(0, 5);

                setCosts(data)
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
                                                {Object.keys(headers).map((key) =>
                                                    <th key={key}>{headers[key]}</th>
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
        </main>
    )
}