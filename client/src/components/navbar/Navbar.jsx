import { useContext } from "react";
import { Link } from "react-router-dom";
import { ConnexionContext } from "../../Contextes/ConnexionContexte";
import "./styles/navbar.css";

function Navbar() {
  const { alias, isAdmin, isConnected, profilePicture } =
    useContext(ConnexionContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img
              src={`${import.meta.env.VITE_API_URL}/icones/toHome.svg`}
              alt="Retour à l'accueil"
            />
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin">
              <img
                src={`${import.meta.env.VITE_API_URL}/icones/Admin.svg`}
                alt="page administrateur"
              />
            </Link>
          </li>
        )}
        <li>
          <Link to="/auth">
            <img
              src={`${import.meta.env.VITE_API_URL}/icones/Auth.svg`}
              alt="authentification"
            />
          </Link>
        </li>
        {isConnected && (
          <li>

          </li>
        )}

        {alias && (
          <li className="greeting">
            <Link to="/profile">
              <img
                src={profilePicture}
                alt={`${alias}'s avatar`}
                className="nav-profile-picture"
              />
            </Link>
            <span className="alias">{alias}</span>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
