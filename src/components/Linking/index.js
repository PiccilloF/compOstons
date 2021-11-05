import { useState, useContext } from 'react';

// Context
// import { UserContext } from 'src/context/userContext';

import PropTypes from 'prop-types';
import './styles.scss';
import axios from 'axios';

const Linking = ({ hide, pointOwner }) => {
  // hook de controle de la saisie du textarea
  const [textValue, setTextValue] = useState();

  // const [state] = useContext(UserContext);
  // const { mail, username, id } = state;
  // fonction pour transmettre les infos pour l'envoi du mail => à finir
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://compostons.herokuapp.com/users/2/mail`, {
      to: 'florian.vallois17@gmail.com', // a ne pas passer, on le recup avec l'id du proposeur
      replyTo: 'Loiclebackeu@gmail.com', // passer le mail du demandeur
      text: 'coucou cest nous', // passer le contenu du textarea
      html: 'coucou cest nous',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // {
    //   textValue,
    //   pointOwner.userId,
    //   mail,
    //   username,
    // }
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
