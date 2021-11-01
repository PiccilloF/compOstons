/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
// import { ErrorMessage } from '@hookform/error-message';

// Import composants
// import Field from './Field';
// import Checkbox from './Checkbox';

export default function Userprofil() {
  const { register, handleSubmit, control } = useForm();
  const [coordinatesValue, setCoordinatesValue] = useState('');

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
                type="submit"
                id="delete-profil__button"
              >supprimer ce compte
              </button>
              <div className="profil-picture__container">
                <div className="profil-picture">mon image</div>
                <input type="file" id="picture-input" />
              </div>
              <div className="compostType-infos">
                <div className="compostType-checkbox-group">
                  <label htmlFor="greenType">Déchets verts</label>
                  <input
                    className="compostType-checkbox-element"
                    type="checkbox"
                    name="greenType"
                    id="greenType"
                    {...register('greentype')}
                  />
                  <label htmlFor="greenType">Déchets bruns</label>
                  <input
                    className="compostType-checkbox-element"
                    type="checkbox"
                    name="brownType"
                    id="brownType"
                    {...register('brownType')}
                  />
                  <label htmlFor="trashType">Déchets ménagers</label>
                  <input
                    className="compostType-checkbox-element"
                    type="checkbox"
                    name="trashType"
                    id="trashType"
                    {...register('trashType')}
                  />
                  <label htmlFor="availabity">Je n'accepte pas de déchets en ce moment</label>
                  <input
                    className="compostType-checkbox-element"
                    type="checkbox"
                    name="availbality"
                    id="availbality"
                    {...register('availbality')}
                  />
                </div>
                <div className="compost-inputs-block">
                  <label htmlFor="address">Adresse: </label>
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
}
