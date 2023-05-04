import { useState } from 'react'
import { Link } from 'react-router-dom'

import { HiPencil } from 'react-icons/hi'


export default function UpdateSupplement(props) {
    const [open, setOpen] = useState(false)

    const { handleUpdate } = props

    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [kg, setKg] = useState(props.kg)

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

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
                    <h3>Editar suplemento</h3>
                    <form>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre del suplemento'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='kg'>
                            Presentación (KG)
                            <div className='measure-input'>
                                <input
                                    id='kg'
                                    name='kg'
                                    type='number'
                                    placeholder='Presentación del suplemento'
                                    value={kg}
                                    onChange={(e) => { setKg(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='description'>
                            Descripción
                            <textarea
                                id='description'
                                name='description'
                                placeholder='Descripción del suplemento'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                required />
                        </label>
                    </form>
                    <footer>
                        <Link onClick={handleClose} role='button' className='secondary'>Cancelar</Link>
                        <Link onClick={() => {
                            handleClose()
                            handleUpdate({ name, description, kg_presentation: kg })
                        }} role='button' >Confirmar</Link>
                    </footer>
                </article>
            </dialog>
        </>
    )
}