import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Linking = ({ hide, pointOwner }) => {
  // hook de controle de la saisie du textarea
  const [textValue, setTextValue] = useState();
  // fonction pour transmettre les infos pour l'envoi du mail => à finir
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(textValue, pointOwner.userId);
  };
  return (
    <>
      <div className="modal-header">
        <h2>Entrer en contact avec {pointOwner.pseudo}</h2>
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
          className="linking-form"
          onSubmit={handleSubmit}
        >
          <textarea
            name="linking-text"
            id="linking-text"
            cols="30"
            rows="10"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button
            className="linking-form-submit"
            type="submit"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

Linking.propTypes = {
  hide: PropTypes.func.isRequired,
  pointOwner: PropTypes.object.isRequired,
};

export default Linking;
