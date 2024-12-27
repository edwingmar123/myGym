import { useNavigate } from "react-router-dom";
import slider from "./assets/img/slider.png";

export function Home() {
  const navigate = useNavigate();

  const next = () => {
    navigate("/home2");
  };

  return (
    <div className="Home">
      <h1>Home</h1>
      <img src={slider} className="img" alt="" />
      <button className="button" onClick={next}>
        Next
      </button>
    </div>
  );
}
