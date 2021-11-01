import PropTypes from 'prop-types';
import './styles.css';

const Card = ({ pseudo, message, userId }) => (
  <div className="list-card">
    <p>
      {pseudo}
    </p>
    <p>
      {message}
    </p>
    <a>Envoyer un message à {pseudo} </a>
    {/* refaire le a pour ouverture de
    la modale du formulaire de mise en relation */}
  </div>
);

Card.propTypes = {
  pseudo: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default Card;
