import PropTypes from 'prop-types';
import './styles.css';

const Card = ({
  pseudo,
  message,
  userId,
  toggle,
  setOwnerPoint,
}) => {
  const handleClick = () => {
    setOwnerPoint({ userId: userId, pseudo: pseudo });
    toggle();
  };
  return (
    <div className="list-card">
      <p>
        {pseudo}
      </p>
      <p>
        {message}
      </p>
      <button name={userId} type="button" className="button-linking" onClick={handleClick}>Envoyer un message à {pseudo}</button>
      {/* au click sur ce bouton je veux executer une fonction qui va
      executer mon toggle et lui passer une value de l'event */}
    </div>
  );
};

Card.propTypes = {
  pseudo: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  setOwnerPoint: PropTypes.func.isRequired,
};

export default Card;
