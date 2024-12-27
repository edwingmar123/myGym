
import React, { useState } from "react";
import Gym from "./assets/Gym.png";
import mars from "./assets/mars.png";
import femenine from "./assets/femenine.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./assets/components/AuthContext";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const GENDERS = {
  MALE: "male",
  FEMALE: "female",
};

export const Sex: React.FC = () => {
  const { user } = useAuth(); 
  const db = getFirestore(); 
  const [gender, setGender] = useState<string>(""); 
  const navigate = useNavigate(); 

  /**
  
   * @param selectedGender - G
   */
  const handleGenderSelect = (selectedGender: string): void => {
    setGender(selectedGender);
    console.log(`Género seleccionado: ${selectedGender}`);
  };

 
  const saveGender = async (): Promise<void> => {
    if (!user) {
      console.error("Usuario no autenticado.");
      return;
    }

    if (!gender) {
      alert("Por favor selecciona un género antes de continuar.");
      return;
    }

    try {
      const userDoc = doc(db, "users", user.uid); 
      await setDoc(userDoc, { gender }, { merge: true }); 
      console.log("Género guardado exitosamente en Firestore");
    } catch (error) {
      console.error("Error al guardar el género en Firestore:", error);
    }
  };

  
  const next = async (): Promise<void> => {
    await saveGender(); 
    navigate("/inicio"); 
  };

  return (
    <div className="Sex">
      <img className="img-gym" src={Gym} alt="Gym logo" />
      <p>Choose gender</p>
      <div className="botonsex-container">
        
        <button
          onClick={() => handleGenderSelect(GENDERS.MALE)}
          className={`button-sex ${gender === GENDERS.MALE ? "selected" : ""}`}
        >
          <img src={mars} alt="Male" />
        </button>

        
        <button
          onClick={() => handleGenderSelect(GENDERS.FEMALE)}
          className={`button-sex ${gender === GENDERS.FEMALE ? "selected" : ""}`}
        >
          <img src={femenine} alt="Female" />
        </button>
      </div>

      
      <button
        className="button"
        onClick={next}
        disabled={!gender} 
      >
        Next
      </button>
    </div>
  );
};