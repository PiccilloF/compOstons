import PropTypes from 'prop-types';
// Import du hook de gestion d'état react useState
import { useState } from 'react';

// Import de composants
import Field from 'src/components/Field';

import './style.scss';

// Composant searchfield
export default function Searchfield({ onFormSubmit }) {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = () => {
    onFormSubmit();
  };

  return (
    <div className="searchfield__form__container">
      <p> Effectuer une recherche proche de chez vous </p>
      <form
        className="searchfield__form"
        onSubmit={handleSubmit}
      >
        <Field
          placeholder="Ville"
          name="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <Field
          placeholder="Adresse"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <Field
          placeholder="Code postal"
          name="zipcode"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
        />
        <button
          type="submit"
          className="searchfield__form__submit"
          onClick={() => console.log('clique')}
        >
          Rechercher
        </button>
      </form>
    </div>
  );
}

Searchfield.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
