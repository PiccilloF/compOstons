import PropTypes from 'prop-types';
// Import du package ReactDOM
import ReactDOM from 'react-dom';

// Création du composant Modal, il prend en paramètre le booléen isShowing
// qui conditionnera l'affichage de la modal, et la fonction hide pour la fermeture.

const InscriptionModal = ({
  isShowing,
  hide,
  title,
  ...props
}) => (isShowing
  ? ReactDOM.createPortal(
    // si isShowing vaut true, la modal sera affiché en surimpression de la page d'accueil
    // via un  Portal, il affiche les composants enfants dans un noeud DOM existant,
    // il le sort de son conteneur.
    <>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <h4>{title}</h4>
              <button
                type="button"
                className="modal-close-button"
                onClick={hide}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
  : null);

export default InscriptionModal;

InscriptionModal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
