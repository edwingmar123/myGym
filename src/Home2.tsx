import { useNavigate } from "react-router-dom";
import Slider1 from "./assets/img/Slider1.png"; 
export const Home2 = () => {
    const navigate  = useNavigate();

    const next = () => {
        navigate("/home3");
    };
    return (
        <div className="Home2">
            <h1>Home2</h1>
            <img src={Slider1} className="img" alt="" />
            <button className="button" onClick={next}>Next</button>
        </div>
    );
};