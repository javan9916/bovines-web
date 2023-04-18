import { useNavigate } from 'react-router-dom'


export default function Error(props) {
    const { code } = props

    const navigate = useNavigate()

    return (
        <>
            <div className='centered-flex-container flex-column'>
                {code === 404 ?
                    <p>Parece que esta página no existe!</p>
                    :
                    <p>Parece que hubo un problema...</p>
                }
                <button className='fit not-found' onClick={() => navigate(-1)}>Volver</button>
            </div>
        </>
    )
}