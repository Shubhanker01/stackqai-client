import { React, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { jwtDecode } from 'jwt-decode'
import { getCookieVal } from '../Utilities/getCookieVal';
import { toast } from 'react-toastify'

function DeleteAll({ isCheckDelete, length }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function checkDisable() {
        if (length === 0) {
            return true
        }
        else {
            return false
        }
    }

    const deleteAllApi = async (userId) => {
        let headersList = {
            "Accept": "*/*"
        }
        let response = await fetch(`http://localhost:9000/ques/history/deleteAll/${userId}`, {
            method: "DELETE",
            headers: headersList
        });
        if (response.status === 400) {
            return Error(response.text())
        }
        else {
            let data = response.text()
            return data
        }
    }

    const deleteAll = () => {
        const cookie = getCookieVal()
        const token = jwtDecode(cookie)
        deleteAllApi(token.id).then((res) => {
            toast.success(res, { position: 'top-center' })
            isCheckDelete(true)
        }).catch((err) => {
            toast.error(err)
        })
        handleClose()
        isCheckDelete(false)
    }
    return (
        <>
            <div className='fixed top-6 right-3'>
                <Button variant="danger" onClick={handleShow} disabled={checkDisable()}>Delete All</Button>
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