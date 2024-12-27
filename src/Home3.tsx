import { useNavigate } from "react-router-dom";
import Slider2 from "./assets/img/Slider2.png";
export const Home3 = () => {
    const navigate  = useNavigate();
    const next = () => {
        navigate("/register");
    }
    return (
        <div className="Home3">
            <h1>Home</h1>
            <img src={Slider2} className="img" alt="" />
            <button className="button" onClick={next}>Next</button>
        </div>
    );
};