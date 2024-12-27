import React from 'react';
import Gym from './assets/Gym.png';
import { useNavigate } from "react-router-dom";

export function Suscripcion ()  {
 
 const navigate = useNavigate();

 const next = () => {
    navigate("");
 }   
    return (
        <div>
            <img src={Gym} alt="" /> 
            <h1>Esta es mi suscripcion</h1>
            <p>notro creomo en ti est aplicaion te pude ayuar</p>
            <div>
                <button>Montly</button>
                <button>Early</button>
            </div>

            <button  className='button' onClick={next}  >Next</button>

        </div>
    );
}