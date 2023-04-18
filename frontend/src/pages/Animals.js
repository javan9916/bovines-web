import { useEffect, useState } from 'react'

import { HiPlus } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import Table from '../components/Table'

const headers = { id: 'Identificador', weight: 'Peso', sex: 'Sexo', breed: 'Raza', actions: '' }


export default function Animals() {
    const [animals, setAnimals] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        let url = 'http://localhost:8000/api/animals/'
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
                console.log(data)
                setAnimals(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [navigate])

    return (
        <main className='container'>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Animales
                    </h1>
                    <Link to='/agregar_animal' role='button' className='flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nuevo animal</p>
                    </Link>
                </div>
                <div>
                    {animals && animals.length ?
                        <Table headers={headers} data={animals} />
                        :
                        <h4 className='centered-flex-container'>No hay animales en la base de datos</h4>
                    }
                </div>
            </section>
            <section>
                <div className='centered-flex-container'>
                    <h1 className='flex-3 fit'>
                        Grupos de animales
                    </h1>
                    <Link to='/agregar_grupo' role='button' className='flex-1 navlink-button flex-container no-decoration'>
                        <HiPlus />
                        &nbsp;
                        <p>Nuevo grupo</p>
                    </Link>
                </div>
                <div className='grid'>
                    <div className='card'>
                        <Link to='/costos' className='card-content centered-flex-container no-decoration'>
                            <h4>Los Pechugas</h4>
                        </Link>
                    </div>
                    <div className='card'>
                        <Link to='/costos' className='card-content centered-flex-container no-decoration'>
                            <h4>Los Maravilla</h4>
                        </Link>
                    </div>
                    <div className='card'>
                        <Link to='/costos' className='card-content centered-flex-container no-decoration'>
                            <h4>Los Pelona</h4>
                        </Link>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <h1>
                        Datos generales
                    </h1>
                </div>
                <div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </section>
        </main>
    )
}