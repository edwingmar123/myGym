import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ejerc1 from "../ejerc1.png";
import ejerc2 from "../ejerc2.png";
import ejerc3 from "../ejerc3.png";
import ejerc4 from "../ejerc4.png";
import { Card } from "./Card"
import { NadvBars } from "./NadvBars";


// Definir el tipo para los ejercicios
interface Ejercicio {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export function Inicio() {
  
  const ejercicios: Ejercicio[] = [
    {
      id: 1,
      title: "Ejercicio 1",
      description: "Descripción del ejercicio 1",
      imgUrl: ejerc1, 
    },
    {
      id: 2,
      title: "Ejercicio 2",
      description: "Descripción del ejercicio 2",
      imgUrl: ejerc2,
    },
    {
      id: 3,
      title: "Ejercicio 3",
      description: "Descripción del ejercicio 3",
      imgUrl: ejerc3,
    },
    {
      id: 4,
      title: "Ejercicio 4",
      description: "Descripción del ejercicio 4",
      imgUrl: ejerc4,
    },
  ];

  useEffect(() => {
    console.log("Componente Inicio montado");
  }, []);

  return (
    <Container>

      <NadvBars />
      
      <Row className="my-4">
        {/* Aquí podrías agregar más contenido o estructuras si es necesario */}
      </Row>

      <Row>
        <Col>
          <ul className="indice-exercises">
            <li className="indice">All body</li>
            <li className="indice">Triceps</li>
            <li className="indice">Biceps</li>
            <li className="indice">Legs</li>
            <li className="indice">Back</li>
          </ul>
        </Col>
      </Row>

      <br />
      <br />
      <br />
      <Row>
        {ejercicios.map((ejercicio) => (
          <Card
            key={ejercicio.id}
            title={ejercicio.title}
            description={ejercicio.description}
            imgUrl={ejercicio.imgUrl} // Enviar la ruta correcta al componente Card
          />
        ))}
      </Row>
    </Container>
  );
}

export default Inicio;
