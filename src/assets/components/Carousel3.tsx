import React, { useState } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  DocumentReference,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface User {
  uid: string;
}

interface AuthContextType {
  user: User | null;
}

const Carrusel: React.FC = () => {
  const pesos: number[] = [
    10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
    76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  ];

  const { user } = useAuth() as AuthContextType; // `user` podría ser `null`, por lo que necesitamos verificarlo
  const db = getFirestore();
  const [currentIndex, setCurrentIndex] = useState<number>(27);

  const navigate = useNavigate();

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) =>
      e.deltaY > 0
        ? Math.min(prev + 1, pesos.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const handleIncrement = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pesos.length - 1));
  };

  const handleDecrement = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const savePeso = async () => {
    if (!user || !user.uid) {
      Swal.fire("Error", "Debes iniciar sesión para guardar tu peso", "error");
      return;
    }
    try {
      const pesoCentrado = pesos[currentIndex];
      const pesoDoc: DocumentReference = doc(db, "users", user.uid);
      await setDoc(
        pesoDoc,
        {
          peso: pesoCentrado,
          timestamp: Timestamp.now(),
        },
        { merge: true }
      );
      Swal.fire("Éxito", "Peso guardado correctamente", "success");
      navigate("/sex");
    } catch (error) {
      console.error("Error al guardar el peso:", error);
      Swal.fire("Error", "No se pudo guardar el peso", "error");
    }
  };

  return (
    <div className="carrusel-container" onWheel={handleScroll}>
      <button className="carrusel-button" onClick={handleDecrement}>
        -
      </button>
      <div className="carrusel">
        {pesos.map((peso, index) => (
          <div
            key={peso}
            className={`carrusel-item ${
              index === currentIndex ? "selected" : ""
            }`}
            style={{
              transform: `translateY(${-currentIndex * 50}px)`,
            }}
          >
            {peso} kg
          </div>
        ))}
      </div>
      <button className="carrusel-button" onClick={handleIncrement}>
        +
      </button>
      <button className="carrusel-button" onClick={savePeso}>
        Guardar
      </button>
    </div>
  );
};

export default Carrusel;
