// Import du gestionnaire de d'état
import { useState } from 'react';
import axios from 'axios';
// Import du composant Field
import Field from 'src/components/Field';

// Import PropTypes
import PropTypes from 'prop-types';

// Import fichier scss
import './style.scss';

// Le composant Login est une Modale, qui doit s'afficher au click sur l'icône Login
// Utilisation de ReactDOM.createPortal : https://fr.reactjs.org/docs/portals.html
// Les portails fournissent une excellente solution
// pour afficher des composants enfants dans un nœud DOM
// qui existe en dehors de la hiérarchie DOM du composant parent.
// ReactDOM.createPortal(child, container)
// child => un élément react dans ce cas
// container => un élément du DOM, ici l'élément avec l'id root

const Login = ({ hide, setIsLogin }) => {
  // console.log('test composant login');

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://compostons.herokuapp.com/login', {
      mail: emailValue,
      password: passwordValue,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="modal-header">
        <h2>Connexion</h2>
        <button
          name="Fermeture"
          type="button"
          className="modal-close-button"
          onClick={hide}
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form
          className="connexion-form"
          onSubmit={handleSubmit}
        >
          <div className="input-field">
            <Field
              name="Email"
              placeholder="Votre adresse email"
              type="email"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />
            <Field
              name="password"
              placeholder="Votre mot de passe"
              type="password"
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
            />
          </div>
          <button
            className="connexion-form__submit"
            type="submit"
          >
            Connexion
          </button>
        </form>
        <p className="inscription">Pas encore inscrit ?</p>
        <button
          className="inscription-button"
          type="button"
          onClick={() => setIsLogin(false)}
        >
          S'inscrire
        </button>
      </div>
    </>
  );
};

Login.propTypes = {
  hide: PropTypes.func.isRequired,
  setIsLogin: PropTypes.func.isRequired,
};

export default Login;
