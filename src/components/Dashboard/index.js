/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */

import { useHistory } from 'react-router-dom';
import { useEffect, useReducer, useState, useContext } from 'react';
import { UserContext } from 'src/context/userContext';
import axios from 'axios';
import './styles.scss';

const initialState = {
  newFirstname: '',
  newLastname: '',
  newUsername: '',
  newCompostType: '',
  newAddress: '',
  location: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INPUTCHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'INITIALVALUE':
      return {
        ...state,
        ...action.initialValue,
      };
    default:
      break;
  }
};

const Dashboard = () => {

  const [addressResults, setAddressResults] = useState([]);
  const [displayAddressResults, setDisplayAddressResults] = useState(false);
  const [isInAddressResultsZone, setIsInAddressResultsZone] = useState(false);
  const [displayValidMessage, setDisplayValidMessage] = useState(false);

  const [contextState, contextDispatch] = useContext(UserContext);
  const { id, username, firstname, lastname, address, compostType } = contextState;

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    newFirstname, newLastname, newUsername, newCompostType, newAddress, location,
  } = state;

  useEffect(() => {
    dispatch({
      type: 'INITIALVALUE',
      initialValue: {
        newFirstname: firstname,
        newLastname: lastname,
        newUsername: username,
        newCompostType: compostType,
        newAddress: address,
      },
    });
  }, [id, username, firstname, lastname, address, compostType]);

  /**
   * Récupère les propositions d'adresse depuis l'api "api-adresse.data.gouv.fr"
   * si l'adresse (indiqué par l'utilisateur) comporte plus de 3 caractères.
   */
  useEffect(() => {
    if (newAddress.length > 3 && displayAddressResults) {

      const getAddressProposal = async () => {
        const formatResults = [];

        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${newAddress}`);
        const results = response.data.features;

        results.map((result) => formatResults.push({
          key: result.properties.id,
          title: result.properties.label,
          location: { lat: result.geometry.coordinates[1], lon: result.geometry.coordinates[0] },
        }));

        setAddressResults(formatResults);
      };
      getAddressProposal();
    }
  }, [newAddress]);

  /**
   * Met à jour la valeur de "newAddress" et "location" du state du reducer lors du click sur une adresse proposée.
   * @param {Object[]} result
   */
  const handleOnClickResultItem = (result) => {
    setDisplayAddressResults(false);
    dispatch({
      type: 'INPUTCHANGE',
      name: 'newAddress',
      value: result.title,
    });
    dispatch({
      type: 'INPUTCHANGE',
      name: 'location',
      value: result.location,
    });
  };

  /**
   * Gère l'affichage ou non des adresses proposées sous l'input "address" selon si l'input à le focus ou non.
   * @param {*} event
   */
  const handleOnFocusOnBlurInputAddress = (event) => {
    if (event._reactName === 'onFocus') setDisplayAddressResults(true);
    if (event._reactName === 'onBlur' && !isInAddressResultsZone) setDisplayAddressResults(false);
  };

  const handleOnSubmitForm = (event) => {
    event.preventDefault();

    const data = {
      firstname: newFirstname,
      lastname: newLastname,
      username: newUsername,
      address: newAddress,
      category: newCompostType,
      longitude: location.lon,
      latitude: location.lat,
    };
    console.log(data);

    axios.put(`https://compostons.herokuapp.com/users/${id}`, data)
      .then((response) => {
        console.log(response);
        // Faire condition : si la reponse retourne un status "ok" (code 200 ou 201) alors j'éxécute ceci :
        setDisplayValidMessage(true);
        setTimeout(() => {
          setDisplayValidMessage(false);
        }, 2500);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const history = useHistory();

  const onDeletedAccountRedirect = () => {
    const url = '/';
    history.push(url);
  };

  const handleAccountDeleteButton = () => {
    axios.delete(`https://compostons.herokuapp.com/users/${id}`)
      .then((response) => {
        console.log('la suppression est OK');
      })
      .catch((error) => {
        console.log('error', error);
      });

    contextDispatch({
      type: 'LOGOUT',
    });
    onDeletedAccountRedirect();
  };

  return (
    <div className="dashboard__container">
      <h1>Gestion du profil</h1>
      <div className="picture-zone">
        <div className="profil-picture__container">
          <div className="profil-picture">mon image</div>
          <input type="file" id="picture-input" />
        </div>
      </div>
      <form onSubmit={handleOnSubmitForm} className="dashboard-form">
        <div className="dashboard-fields__blocks">
          <div className="userInfos__block">
            <h2 className="section-title"> Mes informations </h2>
            <div className="userInfos__input-element">
              <label htmlFor="newFirstname" className="input-label">Prénom </label>
              <input
                className="input-field"
                id="newFirstname"
                name="newFirstname"
                type="text"
                value={newFirstname}
                onChange={(e) => dispatch({
                  type: 'INPUTCHANGE',
                  name: e.target.name,
                  value: e.target.value,
                })}
              />
            </div>
            <div className="userInfos__input-element">
              <label htmlFor="newLastname" className="input-label">Nom </label>
              <input
                className="input-field"
                id="newLastname"
                name="newLastname"
                type="text"
                value={newLastname}
                onChange={(e) => dispatch({
                  type: 'INPUTCHANGE',
                  name: e.target.name,
                  value: e.target.value,
                })}
              />
            </div>
            <div className="userInfos__input-element">
              <label htmlFor="newUsername" className="input-label">Pseudo </label>
              <input
                className="input-field"
                id="newUsername"
                name="newUsername"
                type="text"
                value={newUsername}
                onChange={(e) => dispatch({
                  type: 'INPUTCHANGE',
                  name: e.target.name,
                  value: e.target.value,
                })}
              />
            </div>
          </div>
          <div className="compost-infos__block">
            <h2 className="section-title"> Mon compost </h2>
            <div className="compost-infos__select">
              <label htmlFor="newCompostType" className="input-label">Type de déchets acceptés </label>
              <select
                id="newCompostType"
                name="newCompostType"
                type="text"
                value={newCompostType}
                onChange={(e) => dispatch({
                  type: 'INPUTCHANGE',
                  name: e.target.name,
                  value: e.target.value,
                })}
              >
                <option className="option-value" value="vert">Déchets verts</option>
                <option className="option-value" value="marron">Déchets marron</option>
                <option className="option-value" value="tous">Tous types de déchets compostables</option>
                <option className="option-value" value="aucun">Indisponible</option>
              </select>

            </div>
            <div className="dashboard_searchLocation">
              <label htmlFor="newAddress" className="input-label">Localisation du compost </label>
              <input
                id="newAddress"
                name="newAddress"
                type="text"
                placeholder="Saisissez votre Adresse"
                value={newAddress}
                onFocus={handleOnFocusOnBlurInputAddress}
                onBlur={handleOnFocusOnBlurInputAddress}
                onChange={(e) => dispatch({
                  type: 'INPUTCHANGE',
                  name: e.target.name,
                  value: e.target.value,
                })}
              />
              <div
                className="dashboard_searchLocation_displayResults"
                onMouseEnter={() => setIsInAddressResultsZone(true)}
                onMouseLeave={() => setIsInAddressResultsZone(false)}
              >
                {displayAddressResults && addressResults.length > 0 && addressResults.map((result) => {
                  return (
                    <div
                      key={result.key}
                      className="dashboard_searchLocation_displayResults_item"
                      onClick={() => handleOnClickResultItem(result)}
                    >
                      {result.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="compost-infos-footer">
              <p>Je supprime mon point de compostage :</p>
              <button
                className="delete__button"
                type="button"
                onClick={() => console.log('je supprime ce compost')}
                id="delete-compost__button"
              >Supprimer
              </button>
            </div>
          </div>
        </div>
        <div className="button-block">
          <button type="submit" className="submit__button">Enregistrer mes informations</button>
          {displayValidMessage && <div className="dashboard_validMessage">Modifications enregistrées avec succès !</div>}
          <button
            className="delete__button"
            type="button"
            onClick={handleAccountDeleteButton}
          >
            Je supprime mon compte
          </button>

        </div>
      </form>
    </div>
  );
};

export default Dashboard;
