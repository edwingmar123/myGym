import { Card } from "./Card";
import { NadvBars } from "./NadvBars";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ejerc1 from "../ejerc1.png";

interface Ejercicio {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export function Work() {
  const ejercicios: Ejercicio[] = [
    {
      id: 1,
      title: "Ejercicio 1",
      description: "Descripción del ejercicio 1",
      imgUrl: ejerc1,
    },
  ];

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/splint");
  };

  return (
    <div>
      <NadvBars />
      <Row>
        {ejercicios.map((ejercicio) => (
          <Card
            key={ejercicio.id}
            title={ejercicio.title}
            description={ejercicio.description}
            imgUrl={ejercicio.imgUrl}
            onClick={() => handleCardClick()}
          />
        ))}
      </Row>
    </div>
  );
}
