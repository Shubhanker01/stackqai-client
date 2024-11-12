import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

function Checkbox() {
    let [checked,isChecked] = useState(false)
    function check(){

    }
    return (
        <div>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={type} className="">
                        <Form.Check type={type} id={`check-api-${type}`}>
                            <Form.Check.Input type={type} isValid />
                        </Form.Check>
                    </div>
                ))}
            </Form>
        </div>
    )
}

export default Checkbox