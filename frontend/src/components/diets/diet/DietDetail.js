import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { baseURL } from '../../../shared'
import DeleteModal from '../../DeleteModal'
import UpdateDiet from './UpdateDiet'


const headers = { name: 'Suplemento', quantity: 'Cantidad' }

export default function DietDetail() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [diet, setDiet] = useState()
    const [dietSupplements, setDietSupplements] = useState()

    const { id } = useParams()

    function deleteDiet() {
        const url = baseURL + `api/diet/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404)
                        navigate('/404')
                    else
                        navigate('/500')
                }
                toast.success('¡Eliminado correctamente!')
                navigate(-1)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    function updateDiet(updateData) {
        setLoading(true)

        const { name, supplements } = updateData
        const data = {
            name: name,
            supplements: supplements.filter(supplement => supplement.isChecked)
        }

        const authHeaders = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        }

        const dietURL = baseURL + `api/diet/${id}/`
        const dietSupplementURL = baseURL + `api/diet_supplement/?diet_id=${id}`
        Promise.all([
            fetch(dietURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                },
                body: JSON.stringify(data)
            }).then(response => response.json()),
            fetch(dietSupplementURL, authHeaders).then(response => response.json()),
        ])
            .then(([dietData, dietSupplementData]) => {
                toast.success('¡Editado correctamente!')
                setDiet(dietData)
                setDietSupplements(dietSupplementData)
                setLoading(false)
            })
            .catch(() => {
                toast.error('Algo salió mal... Intenta de nuevo más tarde')
            })
    }

    useEffect(() => {
        setLoading(true)

        const authHeaders = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        }

        const dietURL = baseURL + `api/diet/${id}`
        const dietSupplementURL = baseURL + `api/diet_supplement/?diet_id=${id}`
        Promise.all([
            fetch(dietURL, authHeaders).then(response => response.json()),
            fetch(dietSupplementURL, authHeaders).then(response => response.json()),
        ])
            .then(([dietData, dietSupplementData]) => {
                setDiet(dietData)
                setDietSupplements(dietSupplementData)
                setLoading(false)
            })
            .catch((e) => { console.log(e) })
    }, [navigate, id])

    if (loading) {
        return (
            <div className='centered-flex-container'>
                <div className='loader' />
            </div>
        )
    } else {
        if (diet) {
            return (
                <main className='container'>
                    <div className='centered-flex-container'>
                        <h1 className='flex-3 fit'>
                            {diet.name}
                        </h1>
                        <div className='centered-flex-container'>
                            <UpdateDiet
                                handleUpdate={updateDiet}
                                name={diet.name}
                                dietSupplements={dietSupplements} />
                            <DeleteModal handleDelete={deleteDiet} object='esta dieta' />
                        </div>
                    </div>

                    <section>
                        <div className='flex-column'>
                            <div>
                                <strong> Costo total </strong>
                                <p>{diet.total_cost} colones </p>
                            </div>
                            <div>
                                <strong> Peso total </strong>
                                <p>{diet.total_weight} KG </p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='centered-flex-container'>
                            <h2 className='flex-3 fit'>
                                Suplementos
                            </h2>
                        </div>
                        <div>
                            {
                                dietSupplements && dietSupplements.length ?
                                    <table>
                                        <thead>
                                            <tr key='headers'>
                                                {Object.keys(headers).map((key) =>
                                                    <th key={key}>{headers[key]}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dietSupplements.map((dietSupplement, key) =>
                                                <tr key={key}>
                                                    <td>{dietSupplement.supplement.name}</td>
                                                    <td>{dietSupplement.quantity} KG</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    :
                                    <h4 className='centered-flex-container'>No hay suplementos asociados a esta dieta</h4>
                            }

                        </div>
                    </section>
                </main>
            )
        }
    }
}