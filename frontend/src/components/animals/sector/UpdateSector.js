import { useState } from 'react'
import { Link } from 'react-router-dom'

import { HiPencil } from 'react-icons/hi'


export default function UpdateSector(props) {
    const [open, setOpen] = useState(false)

    const { handleUpdate } = props

    const [name, setName] = useState(props.name)
    const [area, setArea] = useState(props.area)

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
                    <h3>Editar sector</h3>
                    <form>
                        <label htmlFor='name'>
                            Nombre
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Nombre del sector'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required />
                        </label>
                        <label htmlFor='area'>
                            Área
                            <input
                                id='area'
                                name='area'
                                type='number'
                                placeholder='Área del terreno'
                                value={area}
                                onChange={(e) => { setArea(e.target.value) }}
                                required />
                        </label>
                    </form>
                    <footer>
                        <Link onClick={handleClose} role='button' className='secondary'>Cancelar</Link>
                        <Link onClick={() => {
                            handleClose()
                            handleUpdate({ name, area })
                        }} role='button' >Confirmar</Link>
                    </footer>
                </article>
            </dialog>
        </>
    )
}