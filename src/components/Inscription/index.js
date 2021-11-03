/* eslint-disable arrow-body-style */
// Import du gestionnaire de d'état
import { useState, useEffect } from 'react';
import axios from 'axios';

// Import du composant Field
import Field from 'src/components/Field';

// Import PropTypes
import PropTypes from 'prop-types';

// Import fichier scss
import './style.scss';

const Inscription = ({ hide, setIsLogin }) => {
  // console.log('test composant login');
  const [pseudoValue, setPseudoValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [radioValue, setRadioValue] = useState('proposeur');

  useEffect(() => {
    return () => {
      setIsLogin(true);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'post',
      url: ('https://compostons.herokuapp.com/register'),
      mail: emailValue,
      password: passwordValue,
      confirmedPassword: passwordValue,
      username: pseudoValue,
      role: radioValue,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <>
      <div className="modal-header">
        <h2>Inscription</h2>
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
          className="inscription-form"
          onSubmit={handleSubmit}
        >
          <div className="input-field">
            <Field
              name="pseudo"
              placeholder="Pseudo"
              type="text"
              value={pseudoValue}
              onChange={(event) => setPseudoValue(event.target.value)}
              required
            />
            <Field
              name="Email"
              placeholder="Votre adresse email"
              type="email"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
              required
            />
            <Field
              name="password"
              placeholder="Votre mot de passe"
              type="password"
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
              required
            />
          </div>
          <div className="radio-field">
            <p className="radio-field__text">Je souhaite :</p>
            <label htmlFor="proposeur">
              <input
                onChange={(event) => setRadioValue(event.target.value)}
                type="radio"
                id="offering"
                name="inscriptionChoice"
                value="proposeur"
                className="radio-field__box"
                checked={radioValue === 'proposeur'}
              />
              Proposer mon compost
            </label>
            <label htmlFor="searching">
              <input
                onChange={(event) => setRadioValue(event.target.value)}
                type="radio"
                id="searching"
                name="inscriptionChoice"
                value="chercheur"
                className="radio-field__box"
                checked={radioValue === 'chercheur'}
              />
              Trouver un compost
            </label>
          </div>
          <button
            className="inscription-form__submit"
            type="submit"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

Inscription.propTypes = {
  hide: PropTypes.func.isRequired,
  setIsLogin: PropTypes.func.isRequired,
};

export default Inscription;
