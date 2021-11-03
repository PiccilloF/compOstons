import { useContext } from 'react';

// Context
import { UserContext } from 'src/context/userContext';
// Import PropTypes
import PropTypes from 'prop-types';

// Import composant Link de react-router-dom
import { Link } from 'react-router-dom';

const UserZone = ({ setIsShowing }) => {
  const [state, dispatch] = useContext(UserContext);

  const handleLogoutButton = () => {
    dispatch({
      type: 'LOGOUT',
    });
    setIsShowing(false);
  };

  return (
    <div className="userzone">

      <button
        name="Fermeture"
        type="button"
        className="userzone-close-button"
        onClick={() => setIsShowing(false)}
      >
        <span>&times;</span>
      </button>

      <Link to="/profil">
        <button
          name="Profil"
          type="button"
          className="userzone-profil-button"
        >
          Mon profil
        </button>
      </Link>

      <button
        name="Déconnexion"
        type="button"
        className="userzone-logout-button"
        onClick={handleLogoutButton}
      >
        Déconnexion
      </button>

    </div>
  );
};

UserZone.propTypes = {
  setIsShowing: PropTypes.func.isRequired,
};

export default UserZone;
