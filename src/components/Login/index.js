// Import ReactDOM
import ReactDOM from 'react-dom';

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

const Login = ({ isOpen, hide }) => {
  const target = document.getElementById('root');
  return (
    isOpen
      ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-container">
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
            <div className="modal-body">Contenu modale connexion ici</div>
          </div>
        </div>,
        target,
      )
      : null
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Login;
