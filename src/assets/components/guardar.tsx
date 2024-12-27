// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom"; // Asegúrate de importar esto.
// import { useAuth } from "../components/AuthContext";
// import ejerc1 from "../ejerc1.png";
// import ejerc2 from "../ejerc2.png";
// import ejerc3 from "../ejerc3.png";
// import ejerc4 from "../ejerc4.png";
// import Card from "../components/Card";
// // Estilos para el contenedor principal
// const Container = styled.div`
  
// `;

// // Estilos para el título principal
// const Title = styled.h1`
  
// `;

// // Estilos para el enlace
// const StyledLink = styled(Link)`
  
// `;

// export function Inicio() {

//   const ejercicios = [
//     {
//       id: 1,
//       Title: "Ejercicio 1",
//     descripcion: "Descripción del ejercicio 1",
//     img: ejerc1,
//     },
//     {
//       id: 2,
//       Title: "Ejercicio 2",
//     descripcion: "Descripción del ejercicio 2",
//     img: ejerc2,
//     },
//     {
//       id: 3,
//       Title: "Ejercicio 3",
//     descripcion: "Descripción del ejercicio 3",
//     img: ejerc3,
//     },
//     {
//       id: 4,
//       Title: "Ejercicio 4",
//     descripcion: "Descripción del ejercicio 4",
//     img: ejerc4,
//     },
//   ];
//     }

//   const { user, logOut } = useAuth();

//   const cerrarSesion = async () => {
//     try {
//       await logOut();
//     } catch (error) {
//       console.error("Error al cerrar sesión:", error);
//     }
//   };

//   useEffect(() => {}, []);

//   return (
//     <Container>

//       <div className="o-indice">
//       <ul className="indice-exercises">
//                 <li className="indice">All body </li>
//                 <li className="indice">Triceps</li>
//                 <li className="indice">Biceps</li>
//                 <li className="indice">Legs</li>
//                 <li className="indice">Back</li>
               
//             </ul>
//             {
//             ejercicios.map((ejercicio, index) => {
//               return (
//                 <Card/>
//                 key={index}
//                 {...ejercicios}
//               )
//             })
//           }
//       </div>

//       {/* <Title>
//         Bienvenido {user?.displayName ? user.displayName : "Usuario"}
//       </Title> */}
//       {/* <div>
//         {user?.photoURL ? (
//           <img
//             src={user.photoURL}
//             alt="Imagen de perfil"
//             style={{ borderRadius: "50%", width: "150px", height: "150px" }}
//           />
//         ) : (
//           <p></p>
//         )}
//       </div> */}
//       {/* <button
//         onClick={cerrarSesion}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "1em",
//           backgroundColor: "#dc3545",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Cerrar sesión
//       </button> */}
//       {/* <StyledLink to="/">Ir al inicio</StyledLink> */}
//     </Container>
//   );
// }

// export default Inicio;

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "./Credenciales";
import { DivContainer, FormStyle } from "./Styled";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";

interface Pregunta {
  pregunta: string;
  respuesta: string;
}

interface LibroData {
  id: number;
  nombre: string;
  resumen: string;
  imgUrl: string;
  preguntas: Pregunta[];
  link: string;
}

export function SubirData() {
  const { user } = useAuth();
  const [libroData, setLibroData] = useState<LibroData>({
    id: Date.now(),
    nombre: "",
    resumen: "",
    imgUrl: "",
    preguntas: [],
    respuesta: "",
    link: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setLibroData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPregunta = (): void => {
    setLibroData((prevData) => ({
      ...prevData,
      preguntas: [...prevData.preguntas, { pregunta: "", respuesta: "" }],
    }));
  };

  const handlePreguntaChange = (
    index: number,
    key: keyof Pregunta,
    value: string
  ): void => {
    const updatedPreguntas = libroData.preguntas.map((preg, i) =>
      i === index ? { ...preg, [key]: value } : preg
    );
    setLibroData((prevData) => ({
      ...prevData,
      preguntas: updatedPreguntas,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!libroData.nombre || !libroData.resumen || !libroData.imgUrl || !libroData.link) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para subir un libro.", "error");
      return;
    }

    try {
      const librosCollectionRef = collection(db, "libros");
      await addDoc(librosCollectionRef, {
        ...libroData,
        userId: user.uid,
      });

      Swal.fire("¡Éxito!", "El libro se agregó correctamente.", "success");
      setLibroData({
        id: Date.now(),
        nombre: "",
        resumen: "",
        imgUrl: "",
        preguntas: [],
        respuesta: "",
        link: "",
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo agregar el libro. Intenta de nuevo.", "error");
      console.error("Error al subir libro:", error);
    }
  };

  return (
    <DivContainer>
      <h1>Subir Libro</h1>
      <FormStyle onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del libro"
          value={libroData.nombre || ""}
          onChange={handleChange}
          required
        />
        <textarea
          name="resumen"
          placeholder="Resumen"
          value={libroData.resumen || ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="URL de la imagen"
          value={libroData.imgUrl || ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Enlace al libro"
          value={libroData.link || ""}
          onChange={handleChange}
          required
        />
        <Button type="button" onClick={() => setShowModal(true)}>
          Agregar Preguntas
        </Button>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Preguntas y Respuestas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {libroData.preguntas.map((preg, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Pregunta ${index + 1}`}
                  value={preg.pregunta || ""}
                  onChange={(e) =>
                    handlePreguntaChange(index, "pregunta", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder={`Respuesta ${index + 1}`}
                  value={preg.respuesta || ""}
                  onChange={(e) =>
                    handlePreguntaChange(index, "respuesta", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddPregunta}>
              Agregar otra pregunta
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <button type="submit">Subir</button>
      </FormStyle>
    </DivContainer>
  );
} lo unico que quiero que me modifique es que preguntas se le pueda adicionar 3 pocible respuasta  y una de esas sea la respueta correcta , es lo unico el resto dejalo igual



import React, { useState, useEffect } from "react";
import { db } from "./Credenciales";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface Pregunta {
  titulo: string;
  opciones: { textoRespuesta: string; isCorrect: boolean }[];
}

export const Examen: React.FC<{ libroId: string }> = ({ libroId }) => {
  const { user } = useAuth();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const libroRef = doc(db, "libros", libroId);
        const libroSnap = await getDoc(libroRef);

        if (libroSnap.exists()) {
          const data = libroSnap.data() as { preguntas: Pregunta[] };
          setPreguntas(data.preguntas);
        } else {
          console.error("El libro no existe");
        }
      } catch (error) {
        console.error("Error al cargar las preguntas: ", error);
      }
    };

    fetchPreguntas();
  }, [libroId]);

  const handleAnswerSubmit = (isCorrect: boolean, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCorrect) {
      setPuntuación((prev) => prev + 1);
    }
    e.currentTarget.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
        saveResults();
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setPreguntaActual((prev) => prev + 1);
    setTiempoRestante(10);
    setAreDisabled(false);
  };

  const resetExam = () => {
    setPreguntaActual(0);
    setPuntuación(0);
    setIsFinished(false);
    setTiempoRestante(10);
    setAreDisabled(false);
    setAnswersShown(false);
  };

  const saveResults = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        resultadosExamenes: arrayUnion({
          libroId,
          puntuación,
          totalPreguntas: preguntas.length,
          fecha: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Error al guardar resultados: ", error);
    }
  };

  useEffect(() => {
    if (isFinished || areDisabled) return;

    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) {
        setTiempoRestante((prev) => prev - 1);
      } else {
        setAreDisabled(true);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante, isFinished, areDisabled]);

  if (!user) {
    return <p>Debes iniciar sesión para realizar el examen.</p>;
  }

  if (isFinished) {
    return (
      <main className="app">
        <div className="resultado">
          <h2>¡Examen Terminado!</h2>
          <span>
            Obtuviste {puntuación} de {preguntas.length}
          </span>
          <div className="botones">
            <button onClick={resetExam}>Volver a jugar</button>
            <button onClick={() => setAnswersShown(true)}>Ver respuestas</button>
          </div>
        </div>
      </main>
    );
  }

  if (answersShown) {
    return (
      <main className="app">
        <h2>Respuestas</h2>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <h3>{pregunta.titulo}</h3>
            <p>
              Respuesta correcta:{" "}
              {pregunta.opciones.find((opcion) => opcion.isCorrect)?.textoRespuesta}
            </p>
          </div>
        ))}
        <button onClick={resetExam}>Volver a jugar</button>
      </main>
    );
  }

  return (
    <main className="app">
      <p>Puntuación: {puntuación || "🪙"}</p>
      <div className="pregunta-actual">
        <h2>{preguntas[preguntaActual]?.titulo}</h2>
        <span>Tiempo restante: {tiempoRestante} segundos</span>
      </div>
      <div className="opciones">
        {preguntas[preguntaActual]?.opciones.map((respuesta, index) => (
          <button
            key={index}
            disabled={areDisabled}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
            className={`opcion ${areDisabled ? "disabled" : ""}`}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
};

export default Examen;



<>
<Button variant="primary" onClick={handleShow}>
  X
</Button>

<Modal
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton>
    <Modal.Title>cuestionario</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Examen/>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary">Understood</Button>
  </Modal.Footer>
</Modal>
</>


import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Credenciales";

interface Pregunta {
  pregunta: string;
  opciones: { texto: string; esCorrecta: boolean }[];
}

interface LibroData {
  id: string;
  preguntas: Pregunta[];
}

interface ExamenProps {
  libroId: string; // ID del libro recibido como prop
}

export const Examen: React.FC = () => {
  const preguntas: Pregunta[] = data.preguntas;
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  // Maneja la selección de respuesta
  const handleAnswerSubmit = (isCorrect: boolean, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCorrect) {
      setPuntuacion((prev) => prev + 1);
    }
    e.currentTarget.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  // Avanza a la siguiente pregunta
  const nextQuestion = () => {
    setPreguntaActual((prev) => prev + 1);
    setTiempoRestante(10);
    setAreDisabled(false);
  };

  // Reinicia el estado del examen
  const resetExam = () => {
    setPreguntaActual(0);
    setPuntuacion(0);
    setIsFinished(false);
    setTiempoRestante(10);
    setAreDisabled(false);
    setAnswersShown(false);
  };

  // Maneja el temporizador
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          setAreDisabled(true);
          clearInterval(intervalo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished) {
    return (
      <main className="app">
        <div className="resultado">
          <h2>¡Examen Terminado!</h2>
          <p>
            Obtuviste {puntuacion} de {preguntas.length}
          </p>
          <div className="botones">
            <button onClick={resetExam}>Volver a Jugar</button>
            <button onClick={() => setAnswersShown(true)}>Ver Respuestas</button>
          </div>
        </div>
      </main>
    );
  }

  if (answersShown) {
    return (
      <main className="app">
        <h2>Respuestas</h2>
        <p>Puntuación: {puntuacion}</p>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <h3>{pregunta.titulo}</h3>
            <p>
              Respuesta correcta:{" "}
              {pregunta.opciones.find((opcion) => opcion.isCorrect)?.textoRespuesta}
            </p>
          </div>
        ))}
        <button onClick={resetExam}>Volver a Jugar</button>
      </main>
    );
  }