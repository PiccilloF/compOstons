// Pour valider le type de données j'importe PropTypes
import PropTypes from 'prop-types';
// J'importe le fichier SCSS
import './style.scss';

// Création de mon composant Field qui me servira de base pour
// Mes champs de formulaire.
export default function Field({
  name,
  type,
  labelName,
}) {
  return (
    <>
      <label htmlFor={name}>{labelName}</label>
      <input
        type={type}
        name={name}
        className="field"
        id={name}
      />
    </>
  );
}

// Validation de mes données
Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  labelName: PropTypes.string.isRequired,
};

Field.defaultProps = {
  type: 'text',
};
