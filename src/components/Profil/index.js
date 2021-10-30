// Import de useState pour gérer l'état de mes composants
import { useState } from 'react';

// J'importe mes composants
import Field from 'src/components/Field';
import Checkbox from './Checkbox';

// import du style
import './style.scss';

// Je crée mon composant principal, la page de gestion du profil utilisateur
// C'est un formulaire.
export default function Profil() {
  // Je défini l'état de mes inputs de type checkox.
  const [isGreen, setIsGreen] = useState(true);
  const [isBrown, setIsBrown] = useState(true);
  const [isAll, setIsAll] = useState(true);

  // Je défini l'état de mes inputs de type text.
  const [firstnameValue, setFirstnameValue] = useState('');
  const [lastnameValue, setlastnameValue] = useState('');
  const [aliasValue, setAliasValue] = useState('');
  const [adressValue, setAdressValue] = useState('');
  const [zipcodeValue, setZipcodeValue] = useState('');
  const [cityValue, setCityValue] = useState('');

  // Je défini la fonction pour soumettre mon formulaire.
  const handleSubmit = (event) => {
    console.log(JSON.stringify({
      isGreen,
      isBrown,
      isAll,
      firstnameValue,
      lastnameValue,
      aliasValue,
      adressValue,
      zipcodeValue,
      cityValue,
    }));
    event.preventDefault();
  };

  return (
    <div className="profil__container">
      <form
        className="profil__form"
        onSubmit={handleSubmit}
      >
        <div className="profil__user">
          <p>Mes informations</p>
          <Field
            placeholder="Prénom"
            name="fistname"
            value={firstnameValue}
            onChange={(event) => setFirstnameValue(event.target.value)}
          />
          <Field
            placeholder="Nom"
            name="lastname"
            value={lastnameValue}
            onChange={(event) => setlastnameValue(event.target.value)}
          />
          <Field
            placeholder="Pseudo"
            name="alias"
            value={aliasValue}
            onChange={(event) => setAliasValue(event.target.value)}
          />
          <button
            type="submit"
            id="delete-profil__button"
          >supprimer se compte
          </button>
        </div>
        <div className="profil__compost">
          <div className="checkbox-block">
            <p>Mon compost</p>
            <Checkbox
              value={isGreen}
              compostType="type1"
              onChange={(event) => setIsGreen(event.target.checked)}
            /> Déchets verts
            <Checkbox
              value={isBrown}
              compostType="type2"
              onChange={(event) => setIsBrown(event.target.checked)}
            /> Déchets bruns
            <Checkbox
              value={isAll}
              compostType="type2"
              onChange={(event) => setIsAll(event.target.checked)}
            /> Tous déchets
          </div>
          <div className="compost__inputs">
            <Field
              placeholder="Adresse"
              name="address"
              value={adressValue}
              onChange={(event) => setAdressValue(event.target.value)}
            />
            <Field
              placeholder="Code postal"
              name="zipcode"
              value={zipcodeValue}
              onChange={(event) => setZipcodeValue(event.target.value)}
            />
            <Field
              placeholder="Commune"
              name="city"
              value={cityValue}
              onChange={(event) => setCityValue(event.target.value)}
            />
          </div>
        </div>
        <div className="profil__picture">image</div>
        <button
          id="register-profil__button"
          type="submit"
        >sauvegarder
        </button>
      </form>
    </div>
  );
}
