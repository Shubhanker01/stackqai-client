import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from "react-toastify"
import { produce } from "immer"

function Select({ noOfSelection, ids, filterResults, setResults, selectedIds, items, getItems }) {
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
            // delete by id
            const deleteItems = produce(filterResults, draft => {
                const indexes = ids
                for (let i = 0; i < indexes.length; i++) {
                    let index = indexes[i]
                    let findIndex = draft.find((item) => item._id === index)
                    if (findIndex !== -1) {
                        draft.splice(findIndex, 1)
                    }
                }
                return draft
            })
            selectedIds([])

            setResults(deleteItems)
            // let deletedItems = produce(items, draft => {
            //     ids.map((id) => {
            //         draft.arr.map((item) => {
            //             if (item.arr.length !== 0) {
            //                 let ind = item.arr.findIndex((obj) => obj._id === id)
            //                 if (ind !== -1) {
            //                     item.arr.splice(ind, 1)
            //                 }
            //             }
            //         })
            //     })

            // }
            // )
            // getItems(deletedItems)
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