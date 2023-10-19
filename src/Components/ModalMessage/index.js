import Modal from 'react-bootstrap/Modal';
import React from 'react';

const ModalMessage = ({
  message, show, handleClose,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Alerta</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {message.split('\n').map((msg, index) => (
        <p key={index}>
          {msg}
        </p>
      ))}
    </Modal.Body>
  </Modal>
);

export default ModalMessage;
