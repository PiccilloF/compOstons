// Import PropTypes
import PropTypes from 'prop-types';

// Import composant Link de react-router-dom
import { Link } from 'react-router-dom';

// Import nécessaire pour l'icône du login
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Import du logo
import logo from 'src/assets/logo.png';

// Import fichier scss
import './style.scss';

const Header = ({ onClickLogin }) => {
  console.log('test composant header');

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/">
          <div className="header_title">
            <img src={logo} className="header_title_logo" alt="Logo Compostons" />
            <h1 className="header_title_text">CompOstons</h1>
          </div>
        </Link>
        <div className="nav-login">
          <nav className="nav">
            <Link to="/">
              <button name="Accueil" type="button" className="nav_button">
                Accueil
              </button>
            </Link>
            <Link to="#">
              <button name="Articles" type="button" className="nav_button">
                Articles
              </button>
            </Link>
          </nav>
          <div className="login">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="login_icon"
              onClick={onClickLogin}
            />
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <p>Rien ne se perd, rien ne crée, (presque) tout se compost !</p>
      </div>
    </header>
  );
};

Header.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
};

export default Header;
