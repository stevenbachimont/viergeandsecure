import { Link } from "react-router-dom";
import "./styles/home.css";

function Home() {
  return (
    <main className="homepage">
      <section className="pres">
        <h1 className="titre">homepage</h1>

        <p>
          Template vide.
        </p>
        <p>
         Complêtez à votre guise.
        </p>
      </section>



      <section className="auth">
        <p>
          Connectez-vous pour accéder à votre compte ou créer un compte.
        </p>
        <li>
          <Link to="/auth">
            <img
              src={`${import.meta.env.VITE_API_URL}/icones/Auth.svg`}
              alt="authentification"
            />
          </Link>
        </li>
      </section>
    </main>
  );
}

export default Home;
