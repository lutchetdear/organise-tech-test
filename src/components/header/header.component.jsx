import "./header.styles.scss";
import logo from "../../assets/logo.png";

const Header = () => (
  <div className="header">
    <img src={logo} alt="Organise brand logo" />
    <h1>Our Surveys</h1>
  </div>
);

export default Header;
