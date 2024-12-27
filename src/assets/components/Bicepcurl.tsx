import React, { useState } from "react";
import Videos2 from "./Videos2";
import { useNavigate, Link } from "react-router-dom";
import { Cronometro } from "./Cronometro";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import flecha from "../flecha.png";

export function Bicepcurl() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  const next = () => {
    navigate("/rutinas");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="flecha">
        <Link to="/inicio"> <img  className="flechas" src={flecha} alt="flecha" /> </Link>
      </button>

      <Videos2 />

      <h2>PullUps</h2>

      {/* Lista de ejercicios */}
      <ul className="todo-exercises">
        <li className="pull" onClick={handleShowModal}>
          set 1: 12 - 15 reps
        </li>
        <li className="pull" onClick={handleShowModal}>
          set 2
        </li>
        <li className="pull" onClick={handleShowModal}>
          set 3
        </li>
      </ul>

      {/* Botón para finalizar */}
      <button className="button" onClick={next}>
        Finish the exercise
      </button>

      {/* Modal con el Cronómetro */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Exercise Timer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Componente Cronometro */}
          <Cronometro />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
