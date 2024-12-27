import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Principal() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div>
        <a target="_blank"></a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <h1>Página Principal</h1>
        <p>Serás redirigido en 4 segundos...</p>
      </div>
    </>
  );
}

export default Principal;
