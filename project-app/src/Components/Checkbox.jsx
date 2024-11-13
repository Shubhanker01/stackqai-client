import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

function Checkbox({ id,setNoOfSelection }) {
    let [selected, setSelected] = useState(false)

    function check() {
        if (selected === true) {
            setSelected(false)
            setNoOfSelection(curr => curr-1)
        }
        else {
            setSelected(true)
            setNoOfSelection(curr => curr+1)
            console.log(id)
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