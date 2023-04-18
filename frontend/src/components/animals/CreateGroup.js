import { useState } from 'react'

import { HiPlus, HiCheck, HiArrowDown } from 'react-icons/hi'
import Table from '../Table'


const animals = [
    { id: '1', weight: '315', sex: 'H' },
    { id: '2', weight: '342', sex: 'M' },
    { id: '3', weight: '321', sex: 'H' }
]

const headers = { id: 'Identificador', weight: 'Peso', sex: 'Sexo', actions: '' }


export default function CreateGroup() {
    // General Form States
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [sector, setSector] = useState('')

    // Animals Form States
    const [badgeNumber, setBadgeNumber] = useState('')
    const [weight, setWeight] = useState('')
    const [sex, setSex] = useState('')

    const [newRow, setNewRow] = useState(null)

    function addRow(event) {
        event.preventDefault()
        let element = {
            id: badgeNumber,
            weight: weight,
            sex: sex
        }
        setNewRow(element);
        setBadgeNumber('')
        setWeight('')
        setSex('')
    }

    return (
        <main>
            <div>
                <h1>Nuevo grupo de animales</h1>
                <form>
                    <section id='general-section'>
                        <h3> Información general </h3>
                        <div className='grid'>
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

                            <label htmlFor='date'>
                                Fecha de compra
                                <input
                                    id='date'
                                    name='date'
                                    type='date'
                                    placeholder='Fecha de compra'
                                    value={date}
                                    onChange={(e) => { setDate(e.target.value) }}
                                    required />
                            </label>
                        </div>

                        <div className='grid'>
                            <label htmlFor='sector'>
                                Sector
                                <select
                                    id='sector'
                                    name='sector'
                                    value={sector}
                                    onChange={(e) => { setSector(e.target.value) }}
                                    required>
                                    <option value='' disabled>Seleccionar</option>
                                    <option value='A'>Sector A</option>
                                    <option value='B'>Sector B</option>
                                    <option value='B'>Sector C</option>
                                </select>
                            </label>
                        </div>

                        <div className='centered-flex-container'>
                            <HiArrowDown />
                        </div>
                    </section>
                </form>
                <form onSubmit={addRow}>
                    <section id='animal-section'>
                        <h3>Animales</h3>
                        <div className='grid'>
                            <label htmlFor='badge_number'>
                                Identificador
                                <input
                                    id='badge_number'
                                    name='badge_number'
                                    type='number'
                                    placeholder='Identificador del animal'
                                    value={badgeNumber}
                                    onChange={(e) => { setBadgeNumber(e.target.value) }}
                                    required />
                            </label>

                            <label htmlFor='weight'>
                                Pesaje inicial
                                <div className='measure-input'>
                                    <input
                                        id='weight'
                                        name='weight'
                                        type='number'
                                        placeholder='Pesaje del animal'
                                        value={weight}
                                        onChange={(e) => { setWeight(e.target.value) }}
                                        required />
                                    <div className='centered-flex-container'>KG</div>
                                </div>
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
                        </div>
                        <div className='centered-flex-container'>
                            <div className='flex-3' />
                            <button type='submit' className='flex-1 navlink-button flex-container no-decoration'>
                                <HiPlus />
                                &nbsp;
                                <p>Agregar</p>
                            </button>
                        </div>

                        <div>
                            <Table
                                headers={headers}
                                data={animals}
                                newRow={newRow}
                                setNewRow={setNewRow} />
                        </div>
                    </section>
                </form>
                <div className='centered-flex-container'>
                    <div className='flex-3' />
                    <button className='flex-1 navlink-button flex-container no-decoration'>
                        <HiCheck />
                        &nbsp;
                        <p>Completar</p>
                    </button>
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/>
        </main>
    )
}