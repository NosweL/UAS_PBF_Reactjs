import { Link } from "react-router-dom";
import logo from "../images/Logo_Politeknik_Negeri_Malang.png";
import './Components.css';

function Header() {
  return (
    <div className="ui menu">
      <Link to="/">
        <h1 className="ui centered header">
          <img src={logo} alt="Politeknik Negeri Malang" className="logo" />
          <div className="content">Daftar Kontak Mahasiswa Polinema</div>
        </h1>
      </Link>
    </div>
  );
}

export default Header;