import React, { useState } from "react";
import rutina from "../rutina.png";
import TrackVisibility from "react-on-screen";
import { Link } from "react-router-dom";
import flecha from "../flecha.png";


export function Splint() {
  const [activeTab, setActiveTab] = useState("first");

  return (

    <div>
      <button className="flecha">
        <Link to="/inicio"> <img  className="flechas" src={flecha} alt="flecha" /> </Link>
      </button>

    <div id="projects" className="project-container">
      <div className="image-container">
        <img src={rutina} alt="Rutina" className="rutina-image" />
      </div>

      <TrackVisibility>
        {({ isVisible }) => (
          <div className={`content ${isVisible ? "fade-in" : ""}`}>
            <h2 className="title">¡Crea y Gestiona Tus Rutinas!</h2>
            <p className="description">
              Aquí puedes crear, ver y organizar tus rutinas diarias. ¡Haz que cada día
              cuente!
            </p>

            <div className="tabs-container">
              <button
                onClick={() => setActiveTab("second")}
                className={`tab-button ${
                  activeTab === "second" ? "active-tab" : ""
                }`}
              >
                Crear Rutina
              </button>
              <button
                onClick={() => setActiveTab("first")}
                className={`tab-button ${
                  activeTab === "first" ? "active-tab" : ""
                }`}
              >
                Ver Rutina
              </button>
              <button
                onClick={() => setActiveTab("third")}
                className={`tab-button ${
                  activeTab === "third" ? "active-tab" : ""
                }`}
              >
                Consejos
              </button>
            </div>

            {/* Contenido de las pestañas */}
            <div className="tab-content-container">
              {activeTab === "second" && (
                <div className="tab-content">
                  <h4>Crea una nueva rutina</h4>
                  <p>
                    Organiza tus actividades diarias añadiendo ejercicios y tiempo
                    estimado para cada uno.
                  </p>
                  
                </div>
              )}

              {activeTab === "first" && (
                <div className="tab-content">
                  <h4>Tus rutinas</h4>
                  <ul className="rutinas">
                  <li className="rutina"><button className="button" ><Link to="/pullups" >Pullups</Link></button></li>
  <li className="rutina"><button className="button"><Link to="/legcor" >Legorl</Link></button></li>
  <li className="rutina"><button className="button" ><Link to="/bicepcurl" >Bicepcurl</Link></button></li>
  <li className="rutina"><button className="button" ><Link to="/pullups" >Pullups</Link></button></li>
  <li className="rutina"><button className="button" ><Link to="/pullups" >Pullups</Link></button></li>
</ul>
                 
                </div>
              )}

              {activeTab === "third" && (
                <div className="tab-content">
                  <h4>Consejos de Entrenamiento</h4>
                  <p>
                    Recuerda calentar antes de cada rutina, mantenerte hidratado y
                    escuchar a tu cuerpo.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </TrackVisibility>
    </div>
    </div>
  );
}
