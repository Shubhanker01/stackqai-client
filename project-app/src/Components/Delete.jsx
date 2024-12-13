import { toast } from "react-toastify"
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { produce } from "immer";

const Delete = ({ id, items, getItems, itemkey }) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const deleteChat = async () => {
        let headersList = {
            "Accept": "*/*"
        }
        let response = await fetch(`http://localhost:9000/ques/history/delete/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        let data = await response.text();
        return data
    }

    const deleteModal = () => {
        deleteChat().then((res) => {
            // delete by id
            const deleteItemById = produce(items, draft => {
                const findItemKey = draft.findIndex(obj => obj.key === itemkey)
                let itemsArr = draft[findItemKey].arr
                let findItemsArrIndex = itemsArr.findIndex(obj => obj._id === id)
                if (index !== -1) draft[findItemKey].arr.splice(findItemsArrIndex, 1)
                return draft
            })
            getItems(deleteItemById)
            toast.success(res, { position: 'top-center' })

        }).catch((err) => {
            toast.error(err, { position: 'top-center' })
        })
        handleClose()
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteModal}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <button onClick={handleShow} className="absolute right-[20px] bottom-[10px]">
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" />
            </button>
        </>
    )
}

export default Delete