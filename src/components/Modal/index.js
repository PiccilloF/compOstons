// Import ReactDOM
import ReactDOM from 'react-dom';

// Import du gestionnaire de d'état
import { useState } from 'react';

// Import PropTypes
import PropTypes from 'prop-types';

// Import composant
import Login from 'src/components/Login';
import Inscription from 'src/components/Inscription';

import './style.scss';

// Création du composant Modal, il prend en paramètre le booléen isOpen
// qui conditionnera l'affichage de la modale, et la fonction hide pour la fermeture.
const Modal = ({ isOpen, hide }) => {
  const [isLogin, setIsLogin] = useState(true);
  const target = document.getElementById('root');

  return (
    isOpen
      ? ReactDOM.createPortal(
        // si isShowing vaut true, la modal sera affiché en surimpression de la page d'accueil
        // via un  Portal, il affiche les composants enfants dans un noeud DOM existant,
        // il le sort de son conteneur.
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              {
                isLogin
                  ? <Login hide={hide} setIsLogin={setIsLogin} />
                  : <Inscription hide={hide} setIsLogin={setIsLogin} />
              }
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
