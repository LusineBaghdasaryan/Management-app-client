import React from 'react';
import { Modal} from "react-bootstrap";

export default function DialogModal({ show, onHide, question, onRemove }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <p className='question'>{question}</p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onHide} className='cancel-btn'>Cancel</button>
                <button onClick={onRemove} className='delete-btn'>Delete</button>
            </Modal.Footer>
        </Modal>
    );
}
