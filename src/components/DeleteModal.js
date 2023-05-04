import { useState } from 'react'

import { HiTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'


export default function DeleteModal(props) {
    const { handleDelete, title } = props

    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    return (
        <>
            <button
                onClick={handleOpen}
                className='fit flex-1 navlink-button action-button danger-button flex-container no-decoration'>
                <HiTrash />
                &nbsp;
                <p>Eliminar</p>
            </button>

            <dialog open={open}>
                <article>
                    <h3>Eliminar</h3>
                    <p>
                        ¿Está seguro que desea eliminar {title}?
                    </p>
                    <footer>
                        <Link onClick={handleClose} role='button' className='secondary'>Cancelar</Link>
                        <Link onClick={handleDelete} role='button'>Confirmar</Link>
                    </footer>
                </article>
            </dialog>
        </>
    )
}