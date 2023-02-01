import { useState, useEffect } from 'react'

import { HiPencil, HiTrash } from 'react-icons/hi'


const Row = (props) => {
    const { head, content, deleteRow, index } = props

    return (
        <tr>
            {Object.keys(content).map((key) =>
                head ?
                    <th key={key}>{content[key]}</th>
                    :
                    <td key={key}>{content[key]}</td>
            )}
            {
                !head ?
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
                        <Row key={row.id} head={false} content={row} deleteRow={deleteRow} index={index} />
                    )}
                </tbody>
            </table>
        </>

    )
} 