import { React, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { jwtDecode } from 'jwt-decode'

function DeleteAll() {
    const [show, setShow] = useState(false);
    // const token = jwtDecode()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteAllApi = async () => {

    }
    const deleteAll = () => {

    }
    return (
        <>
            <div className='fixed top-6 right-3'>
                <Button variant="danger" onClick={handleShow}>Delete All</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete All</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete all the items</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteAll}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteAll