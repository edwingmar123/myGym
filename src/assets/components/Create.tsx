import { useState } from "react";
import TrackVisibility from "react-on-screen";
import biceps from "../biceps.png";
import { Link } from "react-router-dom";
import flecha from "../flecha.png";

export function Create() {
  const [activeTab, setActiveTab] = useState<"first" | "second" | "third">(
    "first"
  );
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]); // Adding TypeScript type

  // Function to add an exercise to the selected list
  const addExercise = (exercise: string) => {
    setSelectedExercises((prevExercises) => [...prevExercises, exercise]);
  };

  return (
    <div>
      <button className="flecha">
        <Link to="/inicio">
          {" "}
          <img className="flechas" src={flecha} alt="flecha" />{" "}
        </Link>
      </button>

      <div id="projects" className="project-container">
        <ul className="indice-exercises">
          <li className="indice">All body</li>
          <li className="indice">Triceps</li>
          <li className="indice">Biceps</li>
          <li className="indice">Legs</li>
          <li className="indice">Back</li>
        </ul>

        <div className="seagrega-exerciso">
          <ul>
            {selectedExercises.map((exercise, index) => (
              <li key={index} className="selected-exercise">
                {exercise}
              </li>
            ))}
          </ul>
        </div>
        <br />
        <TrackVisibility>
          {({ isVisible }) => (
            <div className={`content ${isVisible ? "fade-in" : ""}`}>
              <h2 className="title">¡Crea y Gestiona Tus Rutinas!</h2>
              <p className="description">
                Aquí puedes crear, ver y organizar tus rutinas diarias. ¡Haz que
                cada día cuente!
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

              {activeTab === "first" && (
                <div className="tab-content">
                  <h4>Tus rutinas</h4>
                  <ul className="rutinas">
                    <li className="rutina">
                      <button
                        className="button"
                        onClick={() => addExercise("Working on biceps")}
                      >
                        <img className="mini-img" src={biceps} alt="Biceps" />{" "}
                        Working on biceps
                      </button>
                    </li>
                    <li className="rutina">
                      <button
                        className="button"
                        onClick={() => addExercise("Barbell curl for biceps")}
                      >
                        <img className="mini-img" src={biceps} alt="Biceps" />{" "}
                        Barbell curl for biceps
                      </button>
                    </li>
                    <li className="rutina">
                      <button
                        className="button"
                        onClick={() =>
                          addExercise("Lifts on the block and in simulators")
                        }
                      >
                        <img className="mini-img" src={biceps} alt="Biceps" />{" "}
                        Lifts on the block and in simulators
                      </button>
                    </li>
                    <li className="rutina">
                      <button
                        className="button"
                        onClick={() =>
                          addExercise(
                            "Lifting dumbbells for biceps while standing"
                          )
                        }
                      >
                        <img className="mini-img" src={biceps} alt="Biceps" />{" "}
                        Lifting dumbbells for biceps while standing
                      </button>
                    </li>
                    <li className="rutina">
                      <button
                        className="button"
                        onClick={() => addExercise("Hammer dumbbell lift")}
                      >
                        <img className="mini-img" src={biceps} alt="Biceps" />{" "}
                        Hammer dumbbell lift
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "third" && (
                <div className="tab-content">
                  <h4>Consejos de Entrenamiento</h4>
                  <p>
                    Recuerda calentar antes de cada rutina, mantenerte hidratado
                    y escuchar a tu cuerpo.
                  </p>
                </div>
              )}
            </div>
          )}
        </TrackVisibility>
      </div>
    </div>
  );
}
