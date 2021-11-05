/* eslint-disable jsx-a11y/label-has-associated-control */
// Import d'axios pour gérer les requêtes.
import axios from 'axios';
// Gérer les champs controllés des formulaires via un hook dédié, évite de regénrer un rendu
// lors de la saisie.
import { useForm } from 'react-hook-form';
// librairie de validation des types données
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import de hooks react
import { useState, useContext } from 'react';
// Context
import { UserContext } from 'src/context/userContext';

// Immport du devTool de useForm hook, installé dans les devs depedencies.
import { DevTool } from '@hookform/devtools';

// import composants
import Resultlist from 'src/components/Userprofil/Resultlist';

import './style.scss';

// schema de validation du type de données
const schema = yup.object().shape({
  firstname: yup.string().required('Veuillez saisir votre prénom'),
  lastname: yup.string().required('Veuillez saisir votre nom'),
  username: yup.string(),
  compostType: yup.string().nullable().required(' Choisissez une option'),
});

export default function Userprofil() {

  // méthodes du hook useform react
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Les variables d'état.
  const [coordinatesValue, setCoordinatesValue] = useState([]);
  const [addressInfo, setAddressInfo] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  // Limport des variables globales d'état.
  const [state, dispatch] = useContext(UserContext);

  // A la soumission du formulaire, appel à l'api du gouvernement pour récupérer les coordonnées
  // en latitude et longitude de l'adresse saisie.
  const { username, id, firstname, lastname } = state;

  // Soumission pour la mise à jour des infos de profil
  // Requête vers la route update
  const onSubmit = (data) => {
    console.log(data);
    // event.preventDefault();
    axios.put(`https://compostons.herokuapp.com/users/${id}`, {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      composType: data.composType,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });

    // deuxième requête compost ?
    /* axios.put(`https://compostons.herokuapp.com/users/${id}/update`, {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      }); */
  };

  // Lors de la frappe dans l'input du formulaire, appel à l'api du gouvernement,
  // pour récupérer les coordonnées
  // en latitude et longitude de l'adresse saisie.
  const apiGouvSearch = (value) => {
    console.log(value);
    axios({
      method: 'get',
      url: (`https://api-adresse.data.gouv.fr/search/?q=${value}&autocomplete=1`),
    })
      .then((response) => {
        const datas = response.data.features;
        const properties = datas.map((item) => item.properties);
        const coordinates = datas.map((item) => item.geometry.coordinates);
        setAddressInfo(properties);
        setCoordinatesValue(coordinates);
        // console.log(datas);
        console.log(properties);
        console.log(coordinates[0][1], coordinates[0][0]);
      });
  };

  // Je retarde la requête à l'api pour limiter les appels à celle-ci
  function searchDelay(value) {
    setTimeout(() => {
      apiGouvSearch(value);
    }, 2000);
  }

  // #region Jsx
  return (
    <div className="main-profil__container">
      <div className="user-profil">
        <p>Vos Informations</p>
        <form
          className="main-profil__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="profil-picture__container">
            <div className="profil-picture">mon image</div>
            <input type="file" id="picture-input" />
          </div>
          <div className="infos-container">
            <div className="user-infos">
              <div className="user-input-group">
                <label htmlFor="firstname">Prénom:
                  <input
                    className="user-input__element"
                    type="text"
                    id="firstname"
                    name="firstname"
                    defaultValue={firstname}
                    {...register('firstname')}
                  />
                </label>
                {errors?.firstname && <p>{errors.firstname?.message}</p>}
                <label htmlFor="lastname">Nom:
                  <input
                    className="user-input__element"
                    type="text"
                    id="lastname"
                    name="lastname"
                    defaultValue={lastname}
                    {...register('lastname')}
                  />
                  {errors?.lastname && <p>{errors.lastname?.message}</p>}
                </label>
                <label htmlFor="username">Pseudo:
                  <input
                    className="user-input__element"
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={username}
                    {...register('username')}
                  />
                </label>
                <button
                  className="delete__button"
                  type="button"
                  onClick={() => console.log('je supprime mon compte')}
                  id="delete-profil__button"
                >supprimer ce compte
                </button>
              </div>
            </div>
            <div className="compostType-infos">
              <div className="compostType-checkbox-group">
                <label htmlFor="greenType">Déchets verts
                  <input
                    className="compostType-checkbox-element"
                    type="radio"
                    name="compostType"
                    id="vert"
                    value="vert"
                    {...register('compostType')}
                  />
                </label>
                <label htmlFor="greenType">Déchets bruns
                  <input
                    className="compostType-checkbox-element"
                    type="radio"
                    name="compostType"
                    id="marron"
                    value="marron"
                    {...register('compostType')}
                  />
                </label>
                <label htmlFor="trashType">Tous types de déchets compostables
                  <input
                    className="compostType-checkbox-element"
                    type="radio"
                    name="compostType"
                    id="tous types"
                    value="tous types"
                    {...register('compostType')}
                  />
                </label>
                <label htmlFor="availability">Je n'accepte pas de déchets en ce moment
                  <input
                    className="compostType-checkbox-element"
                    type="radio"
                    name="compostType"
                    id="aucun"
                    value="aucun"
                    {...register('compostType')}
                  />
                  {errors?.compostType && <p>{errors.compostType?.message}</p>}
                </label>
                <button
                  className="delete__button"
                  type="button"
                  onClick={() => console.log('je supprime ce compost')}
                  id="delete-compost__button"
                >supprimer ce compost
                </button>
              </div>
              <div className="compost-inputs-block">
              <div className="search-container">
                <input
                  type="text"
                  onChange={(event) => searchDelay(event.target.value)}
                />
                <div className="result-list">
                  <Resultlist
                    addressResults={addressInfo}
                    onClick={(event) => setSelectedAddress(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            id="register-profil__button"
            type="submit"
          >sauvegarder
          </button>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  );
  // #endregion
}
