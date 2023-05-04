import { useNavigate } from 'react-router-dom'


export default function Error(props) {
    const navigate = useNavigate()

    const { code } = props
    
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