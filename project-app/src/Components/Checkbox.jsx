import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';

function Checkbox({ id, ids, selectedIds }) {
    const [check, isChecked] = useState(false)

    useEffect(() => {
        if (check) {
            selectedIds([...ids, id])
        }
        else {
            if (ids.length !== 0) {
                selectedIds(ids.filter(currid => currid != id))
            }
        }
    }, [check])

    return (
        <div>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={type} className="">
                        <Form.Check type={type} id={`check-api-${type}`}>
                            <Form.Check.Input type={type} isValid onClick={() => { isChecked(prev => !prev) }} />
                        </Form.Check>
                    </div>
                ))}
            </Form>
        </div>
    )
}

export default Checkbox