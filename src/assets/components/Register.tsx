import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { DivContainer, FormStyle } from "./Styled";
import Gym from "../Gym.png";

// Definir un tipo para el estado del formulario
interface FormData {
  email: string;
  pass: string;
  tlf: string;
}

export const Register: React.FC = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    pass: "",
    tlf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
    const isPhoneValid = /^[0-9]{10}$/.test(formData.tlf);

    if (!isEmailValid) {
      Swal.fire("Error", "Correo electrónico no válido", "error");
      return false;
    }
    if (!isPhoneValid) {
      Swal.fire(
        "Error",
        "Número de teléfono no válido (deben ser 10 dígitos)",
        "error"
      );
      return false;
    }
    return true;
  };

  const handleEmailRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const authInstance = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        authInstance,
        formData.email,
        formData.pass
      );
      console.log("Usuario registrado:", user);

      Swal.fire("Éxito", "Registro completado", "success").then(() =>
        navigate("/login")
      );
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleRegister = async (): Promise<void> => {
    try {
      await googleSignIn();
      Swal.fire(
        "Éxito",
        "Inicio de sesión con Google completado",
        "success"
      ).then(() => navigate("/home"));
    } catch (error: any) {
      console.error("Error al iniciar sesión con Google:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <DivContainer>
      <img src={Gym} alt="" />
      <FormStyle onSubmit={handleEmailRegister}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="pass"
          placeholder="Contraseña"
          value={formData.pass}
          onChange={handleChange}
          minLength={6}
          required
        />
        <input
          type="text"
          name="tlf"
          placeholder="Teléfono (10 dígitos)"
          value={formData.tlf}
          onChange={handleChange}
          pattern="^[0-9]{10}$"
          required
        />
        <button className="register" type="submit">Registrar</button>
      </FormStyle>

      <button className="google" onClick={handleGoogleRegister}>
        Registrarse con Google
      </button>

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </DivContainer>
  );
};

export default Register;
