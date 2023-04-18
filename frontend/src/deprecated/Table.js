import { useState, useEffect } from 'react'

import { HiPencil, HiTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'


const Row = (props) => {
    const navigate = useNavigate()

    const { animal_id, head, content, deleteRow, index } = props
    const show_actions = () => head && content.actions !== undefined

    return (
        <tr>
            {Object.keys(content).map((key) =>
                head ?
                    <th>{content[key]}</th>
                    :
                    <td
                        onClick={() => {
                            navigate(`/animales/${animal_id}`)
                        }}
                    >{content[key]}</td>
            )}
            {
                !head & show_actions ?
                    <td key='actions' className='table-actions'>
                        <button className='fit'>
                            <HiPencil />
                        </button>
                        <button className='delete-button fit' onClick={() => { deleteRow(index) }}>
                            <HiTrash />
                        </button>
                    </td>
                    :
                    null
            }
        </tr>
    )
}


export default function Table(props) {
    const { headers, data, newRow, setNewRow } = props

    const [rows, setRows] = useState(data)
    

    const deleteRow = (element) => {
        let elements = [...rows]
        elements = elements.filter(
            (item, index) => element !== index
        )
        setRows(elements)
    }

    const addRow = (data) => {
        let elements = [...rows, data]
        setRows(elements)
    }

    useEffect(() => {
        if (newRow) {
            addRow(newRow)
            setNewRow(null)
        }
    })

    return (
        <>
            <table>
                <thead>
                    <Row head={true} content={headers} />
                </thead>
                <tbody>
                    {rows.map((row, index) =>
                        <Row
                            animal_id={row.badge_number}
                            key={row.badge_number}
                            head={false}
                            content={row}
                            deleteRow={deleteRow}
                            index={index} />
                    )}
                </tbody>
            </table>
        </>
    )
} 