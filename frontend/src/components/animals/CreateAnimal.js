import { useState } from 'react';

import { HiCheck } from 'react-icons/hi'


export default function CreateAnimal() {
    // Form States
    const [badgeNumber, setBadgeNumber] = useState('')
    const [sex, setSex] = useState('')
    const [breed, setBreed] = useState('')
    const [origin, setOrigin] = useState('')
    const [cost, setCost] = useState('')
    const [purchaseWeight, setPurchaseWeight] = useState('')
    const [purchaseWeightDate, setPurchaseWeightDate] = useState(new Date())
    const [arrivalWeight, setArrivalWeight] = useState('')
    const [arrivalWeightDate, setArrivalWeightDate] = useState(new Date())

    return (
        <main>
            <section>
                <h1> Nuevo animal </h1>
                <form>
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

                        <label htmlFor='cost'>
                            Costo
                            <input
                                id='cost'
                                name='cost'
                                type='number'
                                placeholder='Costo del animal'
                                value={cost}
                                onChange={(e) => { setCost(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='grid'>
                        <label htmlFor='origin'>
                            Procedencia
                            <input
                                id='origin'
                                name='origin'
                                type='text'
                                placeholder='Procedencia del animal'
                                value={origin}
                                onChange={(e) => { setOrigin(e.target.value) }}
                                required />
                        </label>

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

                    <div className='grid'>
                        <label htmlFor='purchase_weight'>
                            Peso en compra
                            <div className='measure-input'>
                                <input
                                    id='purchase_weight'
                                    name='purchase_weight'
                                    type='number'
                                    placeholder='Peso en compra'
                                    value={purchaseWeight}
                                    onChange={(e) => { setPurchaseWeight(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='purchase_date_weight'>
                            Fecha del pesaje
                            <input
                                id='purchase_date_weight'
                                name='purchase_date_weight'
                                type='date'
                                placeholder='Fecha del pesaje de compra'
                                value={purchaseWeightDate}
                                onChange={(e) => { setPurchaseWeightDate(e.target.value) }}
                                required />
                        </label>
                    </div>


                    <div className='grid'>
                        <label htmlFor='arrival_weight'>
                            Peso en finca
                            <div className='measure-input'>
                                <input
                                    id='arrival_weight'
                                    name='arrival_weight'
                                    type='number'
                                    placeholder='Peso en finca'
                                    value={arrivalWeight}
                                    onChange={(e) => { setArrivalWeight(e.target.value) }}
                                    required />
                                <div className='centered-flex-container'>KG</div>
                            </div>
                        </label>

                        <label htmlFor='arrival_date_weight'>
                            Fecha del pesaje
                            <input
                                id='arrival_date_weight'
                                name='arrival_date_weight'
                                type='date'
                                placeholder='Fecha del pesaje en finca'
                                value={arrivalWeightDate}
                                onChange={(e) => { setArrivalWeightDate(e.target.value) }}
                                required />
                        </label>
                    </div>

                    <div className='centered-flex-container'>
                        <div className='flex-3' />
                        <button type='submit' className='flex-1 navlink-button flex-container no-decoration'>
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