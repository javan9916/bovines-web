import { useState } from 'react'
import { Link } from 'react-router-dom'

import { HiPencil } from 'react-icons/hi'


export default function UpdateAnimal(props) {
    const [open, setOpen] = useState(false)

    const { handleUpdate, weights } = props

    const [costPerKG, setCostPerKG] = useState(props.cost_per_kg)
    const [origin, setOrigin] = useState(props.origin)
    const [sex, setSex] = useState(props.sex)
    const [breed, setBreed] = useState(props.breed)

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
                    <h3>Editar animal</h3>
                    <form>
                        {!weights.length ?
                            <label htmlFor='cost_per_kg'>
                                Precio del animal por kg
                                <input
                                    id='cost_per_kg'
                                    name='cost_per_kg'
                                    type='number'
                                    placeholder='Precio del animal'
                                    value={costPerKG}
                                    onChange={(e) => { setCostPerKG(e.target.value) }}
                                    required />
                            </label>
                            :
                            null
                        }
                        <label htmlFor='breed'>
                            Raza
                            <input
                                id='breed'
                                name='breed'
                                type='text'
                                placeholder='Raza del animal'
                                value={breed}
                                onChange={(e) => { setBreed(e.target.value) }}
                                required />
                        </label>

                        <label htmlFor='origin'>
                            Procedencia del animal
                            <select
                                id='origin'
                                name='origin'
                                value={origin}
                                onChange={(e) => { setOrigin(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                <option value='F'>Finca</option>
                                <option value='S'>Subasta</option>
                            </select>
                        </label>

                        <label htmlFor='sex'>
                            Sexo del animal
                            <select
                                id='sex'
                                name='sex'
                                value={sex}
                                onChange={(e) => { setSex(e.target.value) }}
                                required>
                                <option value='' disabled>Seleccionar</option>
                                <option value='M'>Macho</option>
                                <option value='H'>Hembra</option>
                            </select>
                        </label>
                    </form>
                    <footer>
                        <Link onClick={handleClose} role='button' className='secondary'>Cancelar</Link>
                        <Link onClick={() => {
                            handleClose()
                            handleUpdate({ sex, breed, origin, costPerKG })
                        }} role='button' >Confirmar</Link>
                    </footer>
                </article>
            </dialog>
        </>
    )
}