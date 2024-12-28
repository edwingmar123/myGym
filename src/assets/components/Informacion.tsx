import informacion from "../informacion.png";
import { Link } from "react-router-dom";
import flecha from "../flecha.png";
export function Informacion() {
  return (
    <div>
      <button className="flecha">
        <Link to="/inicio">
          {" "}
          <img className="flechas" src={flecha} alt="flecha" />{" "}
        </Link>
      </button>

      <img className="img-informacion" src={informacion} alt="" />

      <h1>Informacion</h1>
      <br />
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Adipiscing enim eu
        turpis egestas pretium aenean pharetra magna ac. Eleifend donec pretium
        vulputate sapien nec. Laoreet non curabitur gravida arcu ac tortor. Elit
        eget gravida cum sociis natoque penatibus et magnis dis. Volutpat
        blandit aliquam etiam erat. Placerat in egestas erat imperdiet sed
        euismod nisi porta. Vitae auctor eu augue ut lectus arcu. Et odio
        pellentesque diam volutpat commodo sed. Dignissim diam quis enim
        lobortis scelerisque. Mollis nunc sed id semper risus in hendrerit
        gravida.
      </p>
    </div>
  );
}
