import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';

function Checkbox({ id, setNoOfSelection, selectedIds, ids }) {
    let [selected, setSelected] = useState(false)
    
    function check() {
        if (selected === true) {
            setSelected(false)
            setNoOfSelection(curr => curr - 1)
            selectedIds(ids.filter(paramId => paramId != id))
        }
        else {
            setSelected(true)
            setNoOfSelection(curr => curr + 1)
            selectedIds([...ids, id])
        }
    }

    return (


        <div>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={type} className="">
                        <Form.Check type={type} id={`check-api-${type}`}>
                            <Form.Check.Input type={type} isValid onClick={check} />
                        </Form.Check>
                    </div>
                ))}
            </Form>
        </div>
    )
}

export default Checkbox