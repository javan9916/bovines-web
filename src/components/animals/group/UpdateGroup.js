import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { HashLoader } from 'react-spinners'
import { HiPencil } from 'react-icons/hi'

import useAxios from '../../../utils/useAxios'
import { spinnerColor } from '../../../shared'


const headers = { action: '', badge_number: 'Identificador', origin: 'Procedencia', sex: 'Sexo', breed: 'Raza' }

export default function UpdateGroup(props) {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const { handleUpdate } = props

    const [name, setName] = useState(props.name)
    const [sector, setSector] = useState(props.sector)
    const [animals, setAnimals] = useState(props.animals)
    const [sectors, setSectors] = useState()

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    function setChecked(event, index) {
        const animalList = [...animals]
        animalList[index].isChecked = event.target.checked
        setAnimals(animalList)
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const sectors = await api.get(`animals/api/sectors/`)
                setSectors(sectors.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate])

    if (loading) {
        return (
            <div className='loader-container'>
                <HashLoader color={spinnerColor} loading={loading} />
            </div>
        )
    } else {
        return (
            <>
                <button
                    onClick={handleOpen}
                    className='fit flex-1 navlink-button action-button flex-container no-decoration'>
                    <HiPencil />
                    &nbsp;
                    <p>Editar</p>
                </button>

                <dialog open={open}>
                    <article>
                        <h3>Editar grupo</h3>
                        <form>
                            <label htmlFor='name'>
                                Nombre del grupo
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Nombre del grupo'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    required />
                            </label>
                            {sectors && sectors.length ?
                                <label htmlFor='sector'>
                                    Sector
                                    <select
                                        id='sector'
                                        name='sector'
                                        value={sector}
                                        onChange={(e) => { setSector(e.target.value) }}
                                        required>
                                        <option value='' disabled>Seleccionar</option>
                                        {sectors.map((sector, key) =>
                                            <option key={key} value={sector.id}>{sector.name}</option>
                                        )}
                                    </select>
                                </label>
                                :
                                null
                            }
                            <div>

                                {animals && animals.length ?
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
                                                {animals.map((animal, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type='checkbox'
                                                                onChange={(e) => setChecked(e, index)}
                                                                id='animal_check'
                                                                name='animal_check'
                                                                value={animal.id}
                                                                checked={animal.isChecked} />
                                                        </td>
                                                        <td>{animal.badge_number}</td>
                                                        {animal.origin === 'S' ? <td>Subasta</td> : <td>Finca</td>}
                                                        <td>{animal.sex}</td>
                                                        <td>{animal.breed}</td>
                                                    </tr>

                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <h4 className='centered-flex-container'>
                                        No hay animales sin grupo
                                    </h4>
                                }
                            </div>
                        </form>
                        <footer>
                            <Link onClick={handleClose} role='button' className='secondary'>Cancelar</Link>
                            <Link aria-busy={loading} onClick={() => {
                                handleClose()
                                handleUpdate({ name, sector, animals })
                            }} role='button' >Confirmar</Link>
                        </footer>
                    </article>
                </dialog>
            </>
        )
    }
}