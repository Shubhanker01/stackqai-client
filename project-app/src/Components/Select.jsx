import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'

function Select({ noOfSelection }) {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        if (show === false) {
            setShow(true)
        }
        else {
            setShow(false)
        }
    }
    return (
        <>
            <Alert variant='success'>
                <Alert.Heading>
                    Selected {noOfSelection} items
                </Alert.Heading>
                <Button variant="secondary" onClick={handleShow}>
                    <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" />
                </Button>
            </Alert>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {noOfSelection} items</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false) }}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { setShow(false) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Select