import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { HiPencil } from 'react-icons/hi'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


const headers = { action: '', quantity: 'Cantidad', name: 'Nombre', kg_presentation: 'Presentación' }

export default function UpdateDiet(props) {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const { handleUpdate, dietSupplements } = props

    const [name, setName] = useState(props.name)
    const [supplements, setSupplements] = useState()

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    function setChecked(event, index) {
        const supps = [...supplements]
        supps[index].isChecked = event.target.checked
        setSupplements(supps)
        console.log('checked', supps)
    }

    function setQuantity(event, index) {
        const supps = [...supplements]
        supps[index].quantity = event.target.value
        setSupplements(supps)
        console.log('quantity', supps)
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const supplements = await api.get(`diets/api/supplements/`)

                const supplementsList = supplements.data.map(supplement => {
                    let object = dietSupplements.find(dietSupp => dietSupp.supplement.id === supplement.id)
                    if (object)
                        return { ...supplement, isChecked: true, quantity: object.quantity }
                    else
                        return { ...supplement, isChecked: false, quantity: 0 }
                })
                setSupplements(supplementsList)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [navigate, dietSupplements])

    if (loading) {
        return <Loading />
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
                        <h3>Editar dieta</h3>
                        <form>
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
                            <div>
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
                                                                value={supplement.id}
                                                                checked={supplement.isChecked} />
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
                                                        <td>{supplement.kg_presentation} KG</td>
                                                    </tr>

                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <h4 className='centered-flex-container'>No hay suplementos en la base de datos</h4>
                                }
                            </div>
                        </form>
                        <footer>
                            <Link onClick={handleClose} role='button' className='secondary'>Cancelar</Link>
                            <Link aria-busy={loading} onClick={() => {
                                handleClose()
                                handleUpdate({ name, supplements })
                            }} role='button' >Confirmar</Link>
                        </footer>
                    </article>
                </dialog>
            </>
        )
    }
}