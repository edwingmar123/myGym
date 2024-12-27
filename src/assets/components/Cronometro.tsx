import React, { useState, useEffect } from "react";

export const Cronometro: React.FC = () => {
  const [isWorkTime, setIsWorkTime] = useState<boolean>(true); 
  const [minutes, setMinutes] = useState<number>(20); 
  const [seconds, setSeconds] = useState<number>(0); 
  const [isRunning, setIsRunning] = useState<boolean>(false); 

  
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else {
        setIsWorkTime((prev) => !prev);
        setMinutes(isWorkTime ? 5 : 20); 
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer); 
  }, [isRunning, seconds, minutes, isWorkTime]);

 
  const toggleTimer = (): void => {
    setIsRunning((prev) => !prev);
  };

  
  const resetTimer = (): void => {
    setIsRunning(false);
    setMinutes(20);
    setSeconds(0);
    setIsWorkTime(true);
  };

  
  const calculateProgress = (): string => {
    const totalSeconds = isWorkTime ? 20 * 60 : 5 * 60; 
    const currentSeconds = minutes * 60 + seconds; 
    return ((currentSeconds / totalSeconds) * 100).toFixed(2); 
  };

  return (
    <section className="pomodoro-container">
      <div className="container">
        <p className="status-message">
          {isWorkTime ? "Time to Work!" : "Time to Relax!"}
        </p>

        <div className="painel">
          <p className={isWorkTime ? "active" : ""}>Work</p>
          <p className={!isWorkTime ? "active" : ""}>Break</p>
        </div>

        <div className="timer">
          <div
            className="circle"
            style={{
              background: `conic-gradient(
                ${isWorkTime ? "#2BE7E8" : "#ff9800"} ${calculateProgress()}%,
                transparent ${calculateProgress()}%
              )`,
            }}
            onClick={toggleTimer} 
          >
            <div className="time">
              
              <p>{String(minutes).padStart(2, "0")}</p>
              <p>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
              <p>{String(seconds).padStart(2, "0")}</p>
            </div>
          </div>
        </div>

        <div className="controls">
          <button id="toggle" onClick={toggleTimer}>
            {isRunning ? (
              <i className="fa-solid fa-pause"></i>
            ) : (
              <i className="fa-solid fa-play"></i>
            )}
          </button>
          <button id="reset" onClick={resetTimer}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
        </div>
      </div>
    </section>
  );
};
