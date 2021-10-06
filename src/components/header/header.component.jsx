import "./header.styles.scss";
import logo from "../../assets/logo.png";

const Header = () => (
  <div className="header navbar navbar-expand-md">
    <div className="navbar-brand">
      <img src={logo} alt="Organise brand logo" className="navbar-brand" />
      <h3>Surveys</h3>
    </div>
  </div>
);

export default Header;
