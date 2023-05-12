import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import DeleteModal from '../../DeleteModal'
import UpdateDiet from './UpdateDiet'
import useAxios from '../../../utils/useAxios'
import Loading from '../../Loading'


const headers = { name: 'Suplemento', quantity: 'Cantidad' }

export default function DietDetail() {
    const api = useAxios()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [diet, setDiet] = useState()
    const [dietSupplements, setDietSupplements] = useState()

    const { id } = useParams()

    const handleDelete = async () => {
        setLoading(true)
        const response = await api.delete(`diets/api/diets/${id}`)

        if (response.status === 204) {
            toast.success('Eliminado correctamente!')
            setLoading(false)
            navigate(-1)
        }
    }

    const handleUpdate = async (data) => {
        setLoading(true)

        data.supplements = data.supplements.filter(supplement => supplement.isChecked)
        const diet = await api.put(`diets/api/diets/${id}/`, data)
        const dietSupplements = await api.get(`diets/api/diet_supplements/?diet_id=${id}`)

        if (diet.status === 200) toast.success('¡Editado correctamente!')

        setDiet(diet.data)
        setDietSupplements(dietSupplements.data)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const diet = await api.get(`diets/api/diets/${id}`)
                const dietSupplements = await api.get(`diets/api/diet_supplements/?diet_id=${id}`)

                setDiet(diet.data)
                setDietSupplements(dietSupplements.data)
                setLoading(false)
            } catch (e) {
                toast.error('Ocurrió un error: ', e)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return <Loading />
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
                                handleUpdate={handleUpdate}
                                name={diet.name}
                                dietSupplements={dietSupplements} />
                            <DeleteModal handleDelete={handleDelete} object='esta dieta' />
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
                            {dietSupplements && dietSupplements.length ?
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