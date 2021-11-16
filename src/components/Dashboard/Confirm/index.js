import PropTypes from 'prop-types';
// hook donnant l'accès à l'instance history de router-dom
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
// import de hook spécifique, donnans l'accès à userReducer et au context
import { UserContext } from 'src/context/userContext';

import axios from 'axios';

import './style.scss';

export default function Confirm({ hide }) {
  const history = useHistory();

  const [State, Dispatch] = useContext(UserContext);

  const { id, jwtToken } = State;

  // Redirection sur la page d'accueil à la soumission du formaulaire
  const onDeletedAccountRedirect = () => {
    const url = '/';
    history.push(url);
  };

  // Soumission du formulaire et requête pour supprimer  un compte utilisateur
  const handleAccountDeleteButton = () => {
    const token = {
      headers: { authorization: `Bearer ${jwtToken}` },
    };
    axios.delete(`https://compostons.herokuapp.com/users/${id}`, token)
      .then((response) => {
        console.log('la suppression est OK', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
    Dispatch({
      type: 'LOGOUT',
    });
    onDeletedAccountRedirect();
  };

  return (
    <div className="confirm-modal_container">
      <div className="confirm-modal_header">
        <p> Êtes-vous sûr ?</p>
        <button
          name="Fermeture"
          type="button"
          className="confirm-modal_close-button"
          onClick={hide}
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="buttons-block">
        <button
          className="delete__button"
          type="button"
          onClick={handleAccountDeleteButton}
        >
          Supprimer
        </button>
        <button
          className="abort__button"
          type="button"
          onClick={hide}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

Confirm.propTypes = {
  hide: PropTypes.func.isRequired,
};
