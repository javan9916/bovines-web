import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiPlus } from 'react-icons/hi'
import { baseURL, ids } from '../shared'


const dietHeaders = { name: 'Nombre', cost: 'Costo total' }
const supplementHeaders = { name: 'Suplemento', price: 'Precio', kg_presentation: 'Presentación' }

export default function Diets() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const [diets, setDiets] = useState()
    const [supplements, setSupplements] = useState()
    const [phases, setPhases] = useState()

    const [endingPhase, setEndingPhase] = useState()
    const [gainingPhase, setGainingPhase] = useState()
    const [devPhase, setDevPhase] = useState()

    function handleDietUpdate(diet, phase) {
        setLoading(true)

        if (phase === ids.ENDING_ID)
            setEndingPhase(phase)
        else if (phase === ids.GAINING_ID)
            setGainingPhase(phase)
        else
            setDevPhase(phase)

        const data = {
            diet: diet
        }

        const url = baseURL + `api/phase/${phase}/`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(data)
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
            .then(() => {
                toast.success('¡Editado correctamente!')
                setLoading(false)
            })
            .catch((e) => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const authHeaders = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${localStorage.getItem('access')}`
            }
        }

        const supplementURL = baseURL + 'api/supplement/'
        const dietURL = baseURL + 'api/diet/'
        const phaseURL = baseURL + 'api/phase/'
        Promise.all([
            fetch(supplementURL, authHeaders).then(response => response.status === 401 ? navigate('/login') : response.json()),
            fetch(dietURL, authHeaders).then(response => response.status === 401 ? navigate('/login') : response.json()),
            fetch(phaseURL, authHeaders).then(response => response.status === 401 ? navigate('/login') : response.json())
        ])
            .then(([supplementData, dietData, phaseData]) => {
                if (supplementData.length > 5)
                    supplementData = supplementData.slice(0, 5);
                setSupplements(supplementData)

                if (dietData.length > 5)
                    dietData = dietData.slice(0, 5);
                setDiets(dietData)

                setPhases(phaseData)
                setDevPhase(phaseData[0].diet ? phaseData[0].diet : '')
                setGainingPhase(phaseData[1].diet ? phaseData[1].diet : '')
                setEndingPhase(phaseData[2].diet ? phaseData[2].diet : '')
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate, endingPhase, gainingPhase, devPhase])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Dietas
                    </h1>
                    <button
                        onClick={() => navigate('agregar_dieta')}
                        className='fit flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nueva dieta</p>
                    </button>
                </div>
                <div>
                    {loading ?
                        <div className='centered-flex-container'>
                            <div className='loader' />
                        </div>
                        :
                        <>
                            {diets && diets.length ?
                                <div>
                                    <table>
                                        <thead>
                                            <tr key='headers'>
                                                {Object.keys(dietHeaders).map((key) =>
                                                    <th key={key}>{dietHeaders[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {diets.map((diet, key) =>
                                                <tr
                                                    key={key}
                                                    onClick={() => {
                                                        navigate(`/dietas/${diet.id}`)
                                                    }}>
                                                    <td>{diet.name}</td>
                                                    <td>{diet.total_cost} colones</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {diets.length >= 5 ?
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
                                <h4 className='centered-flex-container'>No hay dietas en la base de datos</h4>
                            }
                        </>
                    }
                </div>
            </section>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Inventario
                    </h1>
                    <button
                        onClick={() => navigate('suplementos/agregar_suplemento')}
                        className='fit flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nuevo suplemento</p>
                    </button>
                </div>
                <div>
                    {loading ?
                        <div className='centered-flex-container'>
                            <div className='loader' />
                        </div>
                        :
                        <>
                            {supplements && supplements.length ?
                                <div>
                                    <table>
                                        <thead>
                                            <tr key='headers'>
                                                {Object.keys(supplementHeaders).map((key) =>
                                                    <th key={key}>{supplementHeaders[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {supplements.map((supplement, key) =>
                                                <tr
                                                    key={key}
                                                    onClick={() => {
                                                        navigate(`suplementos/${supplement.id}`)
                                                    }}>
                                                    <td>{supplement.name}</td>
                                                    <td>{supplement.prices[0].price}</td>
                                                    <td>{supplement.kg_presentation} KG</td>

                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {supplements.length >= 5 ?
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
                                <h4 className='centered-flex-container'>No hay suplementos en la base de datos</h4>
                            }
                        </>
                    }
                </div>
            </section>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Etapas
                    </h1>
                </div>
                <div>
                    {phases && phases.length === 3 ?
                        <form>
                            <label htmlFor={phases[0].name}>
                                {phases[0].name}
                                <select
                                    id={phases[0].id}
                                    name={phases[0].name}
                                    value={devPhase}
                                    onChange={(e) => { handleDietUpdate(e.target.value, phases[0].id) }}
                                    required>
                                    <option value=''>Seleccionar</option>
                                    {diets.map((diet, key) =>
                                        <option key={key} value={diet.id}>{diet.name}</option>
                                    )}
                                </select>
                            </label>

                            <label htmlFor={phases[1].name}>
                                {phases[1].name}
                                <select
                                    id={phases[1].id}
                                    name={phases[1].name}
                                    value={gainingPhase}
                                    onChange={(e) => { handleDietUpdate(e.target.value, phases[1].id) }}
                                    required>
                                    <option value=''>Seleccionar</option>
                                    {diets.map((diet, key) =>
                                        <option key={key} value={diet.id}>{diet.name}</option>
                                    )}
                                </select>
                            </label>

                            <label htmlFor={phases[2].name}>
                                {phases[2].name}
                                <select
                                    id={phases[2].id}
                                    name={phases[2].name}
                                    value={endingPhase}
                                    onChange={(e) => { handleDietUpdate(e.target.value, phases[2].id) }}
                                    required>
                                    <option value=''>Seleccionar</option>
                                    {diets.map((diet, key) =>
                                        <option key={key} value={diet.id}>{diet.name}</option>
                                    )}
                                </select>
                            </label>
                        </form>
                        :
                        <h4 className='centered-flex-container'>Hay etapas faltantes en la base de datos</h4>
                    }



                </div>
            </section>
        </main>
    )
}