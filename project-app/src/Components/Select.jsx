import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from "react-toastify"

function Select({ noOfSelection, ids, isDeleted, isCheckDelete }) {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        if (show === false) {
            setShow(true)
        }
        else {
            setShow(false)
        }
    }

    const deleteMul = async () => {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
            let bodyContent = JSON.stringify({
                "ids": ids
            });
            let response = await fetch(`http://localhost:9000/ques/history/delete/bulk/${noOfSelection}`, {
                method: "DELETE",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            return data

        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = () => {
        deleteMul().then((res) => {
            toast.success(res, { position: 'top-center' })
            setShow(false)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <>
            <Alert variant='success'>
                <Alert.Heading>
                    Selected {ids.length} items
                </Alert.Heading>
                <Button variant="secondary" onClick={handleShow}>
                    <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" />
                </Button>
            </Alert>
            <Modal show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {ids.length} items</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false) }}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Select