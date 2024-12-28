import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Principal from "./Principal";
import "./App.css";
import { Home } from "./Home";
import { Home2 } from "./Home2";
import { Home3 } from "./Home3";
import { Register } from "./assets/components/Register";
import { Login } from "./assets/components/Login";
import { Inicio } from "./assets/components/Inicio";
import { useAuth } from "./assets/components/AuthContext";
import Perfeil from "./assets/components/Perfeil";
import Carrusel from "./assets/components/Carousel";
import Carrusel2 from "./assets/components/Carousel2";
import Carrusel3 from "./assets/components/Carousel3";
import { Sex } from "./Sex";
import { Suscripcion } from "./Suscripcion";
import { NadvBars } from "./assets/components/NadvBars";
import { Cronometro } from "./assets/components/Cronometro";
import { Pullups } from "./assets/components/Pullups";
import { Create } from "./assets/components/Create";
import { Rutinas } from "./assets/components/Rutinas";
import { Informacion } from "./assets/components/Informacion";
import { Work } from "./assets/components/Work";

import { Bicepcurl } from "./assets/components/Bicepcurl";
import { Legcor } from "./assets/components/Legcor";
import { Splint } from "./assets/components/Splint";
// Interfaz para las rutas protegidas
interface RequireAuthProps {
  children: JSX.Element;
}

// Función para proteger las rutas privadas
function RequireAuth({ children }: RequireAuthProps): JSX.Element {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route index path="/" element={<Principal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home3" element={<Home3 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/sex" element={<Sex />} />
        <Route path="/perfil" element={<Perfeil />} />
        <Route path="/carousel" element={<Carrusel />} />
        <Route path="/carousel2" element={<Carrusel2 />} />
        <Route path="/carousel3" element={<Carrusel3 />} />
        <Route path="/nadvbars" element={<NadvBars />} />
        <Route path="/work" element={<Work />} />
        <Route path="/suscripcion" element={<Suscripcion />} />

        <Route path="/bicepcurl" element={<Bicepcurl />} />
        <Route path="/legcor" element={<Legcor />} />
        <Route path="/cronometro" element={<Cronometro />} />
        <Route path="/pullups" element={<Pullups />} />
        <Route path="/create" element={<Create />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/splint" element={<Splint />} />

        {/* Rutas privadas protegidas */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
