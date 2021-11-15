import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const CardArticle = ({
  title,
  imgcard,
  legende,
  intro,
  slug,
}) => (
  <div className="card">
    <img src={imgcard} alt={legende} className="card-image" />
    <div className="card-description">
      <h2 className="card-description-title">{title}</h2>
      <p className="card-description-intro">{intro}</p>
    </div>
    <Link to={`/articles/${slug}`} className="card-link">Lire la suite</Link>
  </div>
);

CardArticle.propTypes = {
  title: PropTypes.string.isRequired,
  imgcard: PropTypes.string.isRequired,
  legende: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default CardArticle;
