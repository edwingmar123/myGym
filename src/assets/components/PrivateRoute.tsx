import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Definir el tipo para las props de PrivateRoute
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { userName } = useAuth(); // Obtén el valor de userName del contexto

  // Si el usuario está logueado, renderiza los children; si no, redirige a login
  return userName ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
