import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "../components/Credenciales";
import Swal from "sweetalert2";

import imagenes from "../images.jpeg";
import consejo from "../consejo.png";
import mini from "../mini.png";
import mini1 from "../mini1.png";
import mini2 from "../mini2.png";
import mini3 from "../mini3.png";
import mini4 from "../mini4.png";

interface User {
  photoURL: string;
}

export function NadvBars() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const { user, logOut } = useAuth();
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setPhotoURL(data.photoURL || null);
        } else {
          console.log("El documento del usuario no existe.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const cerrarSesion = async () => {
    try {
      await logOut();
      Swal.fire("Sesión cerrada correctamente", "success").then(() =>
        navigate("/login")
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="nad">
      <div className="todoo">
        <button className="abrir-menu" onClick={openMenu}>
          <img
            className="imagenes-perfil"
            src={photoURL || imagenes}
            alt="Abrir menú"
          />
        </button>

        {/* Menú desplegable */}
        <div className={`menu ${menuVisible ? "visible" : ""}`}>
          <button className="cerrar-menu" onClick={closeMenu}>
            <img className="imagenes-perfil" src={imagenes} alt="Cerrar menú" />
          </button>

          <ul className="menu-list">
            <li>
              <Link to="/perfil">
                Settings... <img className="mini-img" src={mini} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/informacion">
                About... <img className="mini-img" src={mini1} alt="" />
              </Link>
            </li>

            <li>
              <Link to="/create">
                creat... <img className="mini-img" src={mini1} alt="" />
              </Link>
            </li>

            <li>
              <Link to="/rutinas">
                Rutina... <img className="mini-img" src={mini2} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/cronometro">
                Services... <img className="mini-img" src={mini3} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/perfil">
                Perfil... <img className="mini-img" src={mini4} alt="" />
              </Link>
            </li>
            <li>
              <button onClick={cerrarSesion}>
                cerrar sesión... <img className="mini-img" src={mini3} alt="" />
              </button>
            </li>
          </ul>
        </div>

        <p>Hi</p>
        <p>{user?.displayName || "Nombre"}</p>
      </div>

      <div className="consejo">
        <p>Recomendación</p>
        <img src={consejo} alt="Recomendación" className="imgconsejo" />
      </div>

      <div className="op">
        <Link to="/inicio">
          <button className="boton-opciones">Discover</button>
        </Link>
        <Link to="/work">
          <button className="boton-opciones">My works</button>
        </Link>
      </div>
    </div>
  );
}

export default NadvBars;
