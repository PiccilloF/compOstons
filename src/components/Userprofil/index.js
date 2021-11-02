/* eslint-disable jsx-a11y/label-has-associated-control */
// Gérer les champs controllés des formulaires via un hook dédié, évite de regénrer un rendu
// lors de la saisie.
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Import du openStreetMapProvider pour gérer l'autocomplétion et la recherche de l"adresse.
import { OpenStreetMapProvider } from 'leaflet-geosearch';
// Import d'axios pour gérer les requêtes.
import axios from 'axios';
// Immport du devTool de useForm hook, installé dans les devs depedencies.
import { DevTool } from '@hookform/devtools';

import './style.scss';

// import { ErrorMessage } from '@hookform/error-message';

export default function Userprofil() {
  const { register, handleSubmit, control } = useForm();
  const [coordinatesValue, setCoordinatesValue] = useState('');
  const [adressInfo, setAdressInfo] = useState([]);

  const provider = new OpenStreetMapProvider();

  // test geoControl
  const searchInput = async (value) => {
    try {
      const results = await provider.search({ query: value });
      setAdressInfo(results);
    }
    catch (error) {
      console.error(error);
    }
  };

  const listResults = adressInfo.map((item) => item.label);
  const shortList = listResults.slice(5);
  console.log(shortList);

  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: 'get',
      url: (`https://api-adresse.data.gouv.fr/search/?q=${data.address}+${data.zipcode}+${data.city}}`),
    })
      .then((response) => {
        const fulldatas = response.data.features;
        const parsedDatas = fulldatas.map((item) => item.geometry);
        const coordinates = parsedDatas.map((item) => item.coordinates);
        setCoordinatesValue([coordinates[0][1], coordinates[0][0]]);
      });
  };

  console.log(coordinatesValue);

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
                <label htmlFor="firstname">Prénom: </label>
                <input
                  className="user-input__element"
                  type="text"
                  id="firstname"
                  name="firstname"
                  {...register('firstname', { required: 'Veuillez saisir votre prénom' })}
                />
                <label htmlFor="lastname">Nom: </label>
                <input
                  className="user-input__element"
                  type="text"
                  id="lastname"
                  name="lastname"
                  {...register('lastname')}
                />
                <label htmlFor="alias">Pseudo: </label>
                <input
                  className="user-input__element"
                  type="text"
                  id="alias"
                  name="alias"
                  {...register('alias')}
                />
                <button
                  type="button"
                  onClick={() => console.log('je supprime mon compte')}
                  id="delete-profil__button"
                >supprimer ce compte
                </button>
              </div>
            </div>
            <div className="compostType-infos">
              <div className="compostType-checkbox-group">
                <label htmlFor="greenType">Déchets verts</label>
                <input
                  className="compostType-checkbox-element"
                  type="radio"
                  name="compostType"
                  id="vert"
                  value="vert"
                  {...register('compostType')}
                />
                <label htmlFor="greenType">Déchets bruns</label>
                <input
                  className="compostType-checkbox-element"
                  type="radio"
                  name="compostType"
                  id="marron"
                  value="marron"
                  {...register('compostType')}
                />
                <label htmlFor="trashType">Tous types de déchets compostables</label>
                <input
                  className="compostType-checkbox-element"
                  type="radio"
                  name="compostType"
                  id="tous types"
                  value="tous types"
                  {...register('compostType')}
                />
                <label htmlFor="availability">Je n'accepte pas de déchets en ce moment</label>
                <input
                  className="compostType-checkbox-element"
                  type="radio"
                  name="compostType"
                  id="aucun"
                  value="aucun"
                  {...register('compostType')}
                />
              </div>
              <div className="compost-inputs-block">
                {/* <label htmlFor="address">Adresse: </label>
                  <input
                    className="user-input__element"
                    type="text"
                    id="address"
                    name="address"
                    {...register('address')}
                  />
                  <label htmlFor="zipcode">Code postale: </label>
                  <input
                    className="user-input__element"
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    {...register('zipcode', { pattern: /^[0-9]+$/, maxLength: 5 })}
                  />
                  <label htmlFor="city">Ville: </label>
                  <input
                    className="user-input__element"
                    type="text"
                    id="city"
                    name="city"
                    {...register('city')}
                  /> */}
                <input
                  type="text"
                  onChange={(event) => searchInput(event.target.value)}
                />
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
}
