import { useState, useContext } from 'react';

// Context
import { UserContext } from 'src/context/userContext';

import PropTypes from 'prop-types';
import './styles.scss';
import axios from 'axios';

const Linking = ({ hide, pointOwner }) => {
  // hook de controle de la saisie du textarea
  const [textValue, setTextValue] = useState();
  const [linkingMessage, setLinkingMessage] = useState('');
  const [state] = useContext(UserContext);
  const { mail, id } = state;
  // fonction pour transmettre les infos pour l'envoi du mail => à finir
  const handleSubmit = (e) => {
    e.preventDefault();
    setLinkingMessage('Envoi en cours');
    axios.post(`https://compostons.herokuapp.com/users/${id}/maile`, {
      ownerId: pointOwner.userId,
      replyTo: mail, // passer le mail du demandeur
      text: textValue, // passer le contenu du textarea
      html: textValue,
    })
      .then((response) => {
        setLinkingMessage('Mail envoyé');
        setTimeout(() => {
          setLinkingMessage();
          hide();
        }, 3000);
        // en cas de retour valide du serveur, je veux afficher un message
        // positif dans la fenetre de l'utilisateur pendant 3 sec et fermé
        // la modale au bout de 3 sec
        console.log(response);
      })
      .catch((error) => {
        // sinon indiquer qu'une erreur est survenue et inviter la personne
        // a essayer plus tard
        setLinkingMessage('Une erreur est survenue, veuillez ré-essayer plus tard');
        console.log(error);
      });

    // {
    //   textValue,
    //   pointOwner.userId,
    //   mail,
    //   username,
    // }
    // console.log(textValue, pointOwner.userId);
  };
  // au clic sur mon bouton d'envoi je veux que celui-ci soit remplacer par 'envoi en cours'
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
          {
            linkingMessage
              ? <div className="linking-form-message">{linkingMessage}</div>
              : (
                <button
                  className="linking-form-submit"
                  type="submit"
                >
                  Envoyer
                </button>
              )
          }
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
