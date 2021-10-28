/* eslint-disable arrow-body-style */
// Import du gestionnaire de d'état
import { useState, useEffect } from 'react';

// Import du composant Field
import Field from 'src/components/Field';

// Import PropTypes
import PropTypes from 'prop-types';

const Inscription = ({ hide, setIsLogin }) => {
  // console.log('test composant login');
  const [pseudoValue, setPseudoValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    return () => {
      setIsLogin(true);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('je soumet le formulaire');
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
            />
            <Field
              name="zipcode"
              placeholder="Code Postal"
              type="text"
              value={zipCodeValue}
              onChange={(event) => setZipCodeValue(event.target.value)}
            />
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
            className="inscription-form__submit"
            type="submit"
          >
            Valider
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
