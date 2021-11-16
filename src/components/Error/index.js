// Import du logo
import errorImage from 'src/assets/images/error-img.png';
import './style.scss';

const Error = () => (
  <>
    <div className="error">
      <p className="error-message">Oops il semblerait que cette page n'existe pas !</p>
    </div>
    <div className="image-container">
      <img src={errorImage} className="error-image" alt="Dessin d'une poule à l'air perdue, page inexistante" />
    </div>
  </>
);

export default Error;
