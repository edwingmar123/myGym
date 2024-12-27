import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Usar el contexto de autenticación
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

interface User {
  uid: string;
}

interface AuthContextType {
  user: User | null;
}

const Carrusel: React.FC = () => {
  const alturas: number[] = [
    1.45, 1.46, 1.47, 1.48, 1.49, 1.5, 1.51, 1.52, 1.53, 1.54, 1.55, 1.56, 1.57,
    1.58, 1.59, 1.6, 1.61, 1.62, 1.63, 1.64, 1.65, 1.66, 1.67, 1.68, 1.69, 1.7,
    1.71, 1.72, 1.73, 1.74, 1.75, 1.76, 1.77, 1.78, 1.79, 1.8, 1.81, 1.82, 1.83,
    1.84, 1.85, 1.86, 1.87, 1.88, 1.89, 1.9, 1.91, 1.92, 1.93, 1.94, 1.95, 1.96,
    1.97, 1.98, 1.99, 2.0,
  ];

  const { user } = useAuth() as AuthContextType; 
  const db = getFirestore(); 
  const [currentIndex, setCurrentIndex] = useState<number>(27); 

  
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => Math.min(prev + 1, alturas.length - 1));
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  
  const handleIncrement = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, alturas.length - 1));
  };

  
  const handleDecrement = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  
  const saveAltura = async () => {
    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para guardar tu altura", "error");
      return;
    }

    try {
      const alturaCentrada = alturas[currentIndex]; 
      const userRef = doc(db, "users", user.uid); 

      
      await setDoc(
        userRef,
        {
          height: alturaCentrada,
          updatedAt: new Date(),
        },
        { merge: true } 
      );

      Swal.fire("Éxito", "Altura guardada correctamente", "success");
    } catch (error) {
      console.error("Error al guardar la altura:", error);
      Swal.fire("Error", "No se pudo guardar la altura", "error");
    }
  };

  return (
    <div className="carrusel-container" onWheel={handleScroll}>
     
      <button className="carrusel-button" onClick={handleDecrement}>
        -
      </button>

      
      <div className="carrusel">
        {alturas.map((altura, index) => (
          <div
            key={index}
            className={`carrusel-item ${
              index === currentIndex ? "selected" : ""
            }`}
            style={{
              transform: `translateY(${-currentIndex * 50}px)`,
            }}
          >
            {altura.toFixed(2)} m
          </div>
        ))}
      </div>

     
      <button className="carrusel-button" onClick={handleIncrement}>
        +
      </button>

      
      <button className="carrusel-button" onClick={saveAltura}>
        Guardar Altura
      </button>

      <div>
      <button className="siguiente-button" > 
      <Link to = "/carousel2" ></Link> 
      Next                                 
      </button>
      </div>
    </div>
  );
};

export default Carrusel;
