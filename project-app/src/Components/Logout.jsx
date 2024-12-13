import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Logout() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clearCache = async () => {
        let headersList = {
            "Accept": "*/*"
        }
        let response = await fetch("http://localhost:9000/ques/clearcache", {
            method: "GET",
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
    }
    
    const logout = () => {
        const cookie = new Cookies()
        cookie.remove('token')
        clearCache()
        navigate('/')
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <Button variant="danger" onClick={handleShow}>
                Logout
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}