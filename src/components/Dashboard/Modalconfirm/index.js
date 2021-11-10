// Import ReactDom
import ReactDOM from 'react-dom';
// Import PropTypes
import PropTypes from 'prop-types';
// Import de composant
import Confirm from '../Confirm';
import './style.scss';

const Modal = ({ isOpen, hide }) => {
  const target = document.getElementById('root');
  return (
    isOpen
      ? ReactDOM.createPortal(
        // si isShowing vaut true, la modal sera affiché en surimpression de la page d'accueil
        // via un  Portal, il affiche les composants enfants dans un noeud DOM existant,
        // il le sort de son conteneur.
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal-confirm">
              <Confirm hide={hide} />
            </div>
          </div>
        </div>,
        target,
      )
      : null
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Modal;
