import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiCheck } from 'react-icons/hi'
import { baseURL } from '../../shared'


export default function CreateCost() {
    const todayDate = new Date()
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth() + 1}` : todayDate.getMonth() + 1
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-')

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [cost, setCost] = useState('')
    const [date, setDate] = useState(formattedDate)

    const [categories, setCategories] = useState([])

    function createCost(e) {
        setLoading(true)
        e.preventDefault()

        const data = {
            name: name,
            type: type,
            category: category,
            cost: cost,
            date: date
        }

        const url = baseURL + 'api/cost/'
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

        const url = baseURL + `api/category/`
        fetch(url)
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
                setCategories(data)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate])

    return (
        <main>
            <section>
                <h1> Nuevo costo </h1>
                <form onSubmit={createCost}>
                    <div className='grid'>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre del costo'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='date'>
                            Fecha del costo
                            <input
                                id='date'
                                name='date'
                                type='date'
                                value={date}
                                onChange={(e) => { setDate(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='cost'>
                            Total
                            <input
                                id='cost'
                                name='cost'
                                type='number'
                                placeholder='Total del costo'
                                value={cost}
                                onChange={(e) => { setCost(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='grid'>
                        <label htmlFor='category'>
                            Categoría
                            <select
                                id='category'
                                name='category'
                                value={category}
                                onChange={(e) => { setCategory(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                {categories.map((category, key) =>
                                    <option key={key} value={category.id}>{category.name}</option>
                                )}
                            </select>
                        </label>

                        <label htmlFor='type'>
                            Tipo de costo
                            <select
                                id='type'
                                name='type'
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                <option value='I'>Inversión</option>
                                <option value='G'>Gasto</option>
                            </select>
                        </label>
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