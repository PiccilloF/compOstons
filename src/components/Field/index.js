// Pour valider le type de données j'importe PropTypes
import PropTypes from 'prop-types';
// J'importe le fichier SCSS
import './style.scss';

// Création de mon composant Field qui me servira de base pour
// Mes champs de formulaire.
export default function Field({
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="field"
      value={value}
      onChange={onChange}
    />
  );
}

// Validation de mes données
Field.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


// Je défini une valeur par défault pour la donnée 'type'.
Field.defaultProps = {
  type: 'text',
};
