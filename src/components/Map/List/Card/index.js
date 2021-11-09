import PropTypes from 'prop-types';
import useModal from 'src/hooks/useModal';
import Modal from 'src/components/Modal';

import './styles.css';

const Card = ({
  pseudo,
  message,
  userId,
  toggleLinking,
  setOwnerPoint,
  isLogged,
}) => {
  const { isOpen, toggle } = useModal();
  const handleClick = () => {
    setOwnerPoint({ userId: userId, pseudo: pseudo });
    toggleLinking();
  };
  const handleClickConnection = () => {
    toggle();
  };
  const connected = (isLogged ? <button name={userId} type="button" className="button-linking" onClick={handleClick}>Envoyer un message à {pseudo}</button> : <button type="button" onClick={handleClickConnection} className="button-linking">Se connecter pour contacter {pseudo}</button>);
  return (
    <>
      <div className="list-card">
        <p>
          {pseudo}
        </p>
        <p>
          {message}
        </p>
        {connected}
        {/* au click sur ce bouton je veux executer une fonction qui va
        executer mon toggle et lui passer une value de l'event */}
      </div>
      <Modal isOpen={isOpen} hide={toggle} />
    </>
  );
};

Card.propTypes = {
  pseudo: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  toggleLinking: PropTypes.func.isRequired,
  setOwnerPoint: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default Card;
