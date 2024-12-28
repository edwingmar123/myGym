import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Credenciales";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DivContainer, FormStyle } from "./Styled";
import Gym from "../Gym.png";

interface FormData {
  email: string;
  pass: string;
}

export function Login() {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ email: "", pass: "" });

  // Manejar cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const authInstance = getAuth();
      const { user } = await signInWithEmailAndPassword(
        authInstance,
        formData.email,
        formData.pass
      );

      await saveUserData(user);

      Swal.fire("Éxito", "Inicio de sesión completado", "success").then(() =>
        navigate("/carousel")
      );
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await googleSignIn();

      await saveUserData(googleUser);

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

  const saveUserData = async (user: any) => {
    const userDocRef = doc(db, "users", user.uid);

    try {
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email || "No especificado",
          displayName: user.displayName || "Usuario Anónimo",
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
        });
        console.log("Documento creado para el usuario:", user.uid);
      } else {
        await setDoc(
          userDocRef,
          {
            lastLogin: new Date().toISOString(),
          },
          { merge: true }
        );
        console.log("Documento actualizado para el usuario:", user.uid);
      }
    } catch (error: any) {
      console.error(
        "Error al guardar datos del usuario en Firestore:",
        error.message
      );
      throw new Error("No se pudo guardar la información del usuario.");
    }
  };

  return (
    <DivContainer>
      <img className="img-gym" src={Gym} alt="Logo" />
      <FormStyle onSubmit={handleLogin}>
        <input
          className="input-email"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input-password"
          type="password"
          name="pass"
          placeholder="Contraseña"
          value={formData.pass}
          onChange={handleChange}
          required
        />
        <button className="btn-login" type="submit">
          Iniciar sesión
        </button>
      </FormStyle>
      <button className="google" onClick={handleGoogleLogin}>
        Iniciar sesión con Google
      </button>
      <p className="no-account">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </DivContainer>
  );
}

export default Login;
