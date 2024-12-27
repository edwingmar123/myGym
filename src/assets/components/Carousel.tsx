import React, { useState } from "react";
import app from "./Credenciales";
import { useAuth } from "./AuthContext";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const EDADES = Array.from({ length: 60 }, (_, i) => i + 1); 

const Carrusel: React.FC = () => {
  const { user } = useAuth(); 
  const db = getFirestore(app); 
  const [currentIndex, setCurrentIndex] = useState<number>(27); 
 

 
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentIndex((prev) =>
      e.deltaY > 0
        ? Math.min(prev + 1, EDADES.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  
  const handleIncrement = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, EDADES.length - 1));

  
  const handleDecrement = () =>
    setCurrentIndex((prev) => Math.max(prev - 1, 0));

  
  const saveEdad = async () => {
    if (!user || !user.uid) {
      Swal.fire("Error", "Debes iniciar sesión para guardar tu edad", "error");
      return;
    }

    try {
      const edadSeleccionada = EDADES[currentIndex];
      const userRef = doc(db, "users", user.uid); 

      await setDoc(
        userRef,
        {
          edad: edadSeleccionada,
          timestamp: new Date(),
        },
        { merge: true }
      );

      console.log("Edad guardada:", edadSeleccionada);
      Swal.fire("Éxito", "Edad guardada correctamente", "success");
    } catch (error) {
      console.error("Error al guardar la edad:", error);
      Swal.fire("Error", "Hubo un problema al guardar tu edad", "error");
    }
  };

  // Render del carrusel
  return (
    <div className="carrusel-container" onWheel={handleScroll}>
      <button className="carrusel-button" onClick={handleDecrement}>
        -
      </button>
      <div className="carrusel">
        {EDADES.map((edad, index) => (
          <div
            key={index}
            className={`carrusel-item ${
              index === currentIndex ? "selected" : ""
            }`}
            style={{
              transform: `translateY(${-currentIndex * 50}px)`,
            }}
          >
            {edad}
          </div>
        ))}
      </div>
      <button className="carrusel-button" onClick={handleIncrement}>
        +
      </button>
      <button className="carrusel-button" onClick={saveEdad}>
        Guardar
      </button>

        <div>
        
      <button className="siguiente-button"  > 
      <Link to = "/carousel2" ></Link> 
      Next                                 
      </button>
        </div>

    </div>
  );
};

export default Carrusel;
