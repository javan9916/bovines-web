import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'

import useAxios from '../utils/useAxios'
import { spinnerColor } from '../shared'


const dietHeaders = { name: 'Nombre', cost: 'Costo total' }
const supplementHeaders = { name: 'Suplemento', price: 'Precio', kg_presentation: 'Presentación' }

export default function Diets() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [diets, setDiets] = useState()
    const [supplements, setSupplements] = useState()
    const [phases, setPhases] = useState()

    const [dietLenght, setDietLenght] = useState()
    const [supplementLenght, setSupplementLenght] = useState()

    const [endingPhase, setEndingPhase] = useState()
    const [gainingPhase, setGainingPhase] = useState()
    const [devPhase, setDevPhase] = useState()

    const handleUpdate = async (diet, phase, id) => {
        setLoading(true)

        if (phase === 'end')
            id ? setEndingPhase(id) : setEndingPhase(null)
        else if (phase === 'gain')
            id ? setEndingPhase(id) : setEndingPhase(null)
        else
            id ? setEndingPhase(id) : setEndingPhase(null)

        const data = {
            diet: diet
        }

        const response = await api.put(`animals/api/phases/${id}/`, data)

        if (response.status === 200) {
            toast.success('¡Editado correctamente!')
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const diets = await api.get('diets/api/diets/')
                const supplements = await api.get('diets/api/supplements/')
                const phases = await api.get('animals/api/phases/')

                setDietLenght(diets.data.length)
                setSupplementLenght(supplements.data.length)

                let dietsList = diets.data
                if (diets.data.length > 5)
                    dietsList = diets.data.slice(0, 5);
                setDiets(dietsList)

                let supplementsList = supplements.data
                if (supplements.data.length > 5)
                    supplementsList = supplements.data.slice(0, 5);
                setSupplements(supplementsList)

                setPhases(phases.data)
                setDevPhase(phases.data[0].diet ? phases.data[0].diet : '')
                setGainingPhase(phases.data[1].diet ? phases.data[1].diet : '')
                setEndingPhase(phases.data[2].diet ? phases.data[2].diet : '')

                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [endingPhase, gainingPhase, devPhase])

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
                                {dietLenght > 5 ?
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
                                {supplementLenght > 5 ?
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
                                        onChange={e => handleUpdate(e.target.value, 'dev', phases[0].id)}
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
                                        onChange={e => handleUpdate(e.target.value, 'gain', phases[1].id)}
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
                                        onChange={e => handleUpdate(e.target.value, 'end', phases[2].id)}
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
}