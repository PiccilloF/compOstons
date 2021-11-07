// Import du gestionnaire de d'état
import { useState, useContext } from 'react';
import axios from 'axios';

// Context
import { UserContext } from 'src/context/userContext';

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
  const [state, dispatch] = useContext(UserContext);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://compostons.herokuapp.com/login', {
      mail: emailValue,
      password: passwordValue,
    })
      .then((response) => {
        console.log(response);

        // Au cas ou on aurait des propriétés dans l'objet response.data qui seraient NULL(falsy),
        // on remplace par une chaîne de caractère vide
        const newData = {
          id: response.data.id,
          username: response.data.username ? response.data.username : '',
          mail: response.data.mail ? response.data.mail : '',
          firstname: response.data.firstname ? response.data.firstname : '',
          lastname: response.data.lastname ? response.data.lastname : '',
          address: response.data.address ? response.data.address : '',
          compostType: response.data.compostType ? response.data.compostType : '',
          role: response.data.role ? response.data.role : '',
          image: response.data.image ? response.data.image : '',
          created_at: response.data.created_at ? response.data.created_at : '',
          updated_at: response.data.updated_at ? response.data.updated_at : '',
        };

        dispatch({
          type: 'LOGIN',
          payload: newData,
        });
        hide();
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
              required
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />
            <Field
              name="password"
              placeholder="Votre mot de passe"
              type="password"
              required
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
