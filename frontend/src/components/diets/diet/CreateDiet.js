import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../../shared'


const headers = { action: '', quantity: 'Cantidad', name: 'Suplemento' }

export default function CreateDiet() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    const [name, setName] = useState('')
    const [supplements, setSupplements] = useState([])

    function setChecked(event, index) {
        const supps = [...supplements]
        supps[index].isChecked = event.target.checked
        setSupplements(supps)
    }

    function setQuantity(event, index) {
        const supps = [...supplements]
        supps[index].quantity = event.target.value
        setSupplements(supps)
    }

    function createDiet(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            name: name,
            supplements: supplements.filter(supplement => supplement.isChecked)
        }

        const url = baseURL + 'diets/api/diets/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
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
                toast.success('¡Creado correctamente!')
                setLoading(false)
                navigate(-1)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const url = baseURL + 'diets/api/supplements/'
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
                data = data.map((supplement) => ({ ...supplement, isChecked: false, quantity: 0 }))
                setSupplements(data)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate])

    return (
        <main>
            <section>
                <h1> Nueva dieta </h1>
                <form onSubmit={createDiet}>
                    <label htmlFor='name'>
                        Nombre
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Nombre de la dieta'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            required />
                    </label>

                    <h3>Suplementos</h3>
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
                                                    {Object.keys(headers).map((key) =>
                                                        <th key={key}>{headers[key]}</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {supplements.map((supplement, index) =>
                                                    <tr
                                                        key={index}>
                                                        <td>
                                                            <input
                                                                type='checkbox'
                                                                onChange={(e) => { setChecked(e, index) }}
                                                                id='supplement_check'
                                                                name='supplement_check'
                                                                value={supplement.id} />
                                                        </td>
                                                        <td className='fit'>
                                                            <input
                                                                value={supplement.quantity}
                                                                onChange={(e) => { setQuantity(e, index) }}
                                                                disabled={!supplement.isChecked}
                                                                id='quantity'
                                                                name='quantity'
                                                            />
                                                        </td>
                                                        <td>{supplement.name}</td>
                                                    </tr>

                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <h4 className='centered-flex-container'>No hay suplementos en la base de datos</h4>
                                }
                            </>
                        }
                    </div>

                    <div className='centered-flex-container'>
                        <div className='flex-3' />
                        <button aria-busy={loading} type='submit' className='flex-1 navlink-button flex-container no-decoration'>
                            <HiCheck />
                            &nbsp;
                            <p>Completar</p>
                        </button>
                    </div>
                </form>
            </section>

        </main>
    )
}