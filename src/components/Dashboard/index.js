/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */

import { useEffect, useReducer, useState, useContext } from 'react';
import { UserContext } from 'src/context/userContext';
import axios from 'axios';
import './styles.scss';

const Dashboard = () => {

  const [addressResults, setAddressResults] = useState([]);
  const [displayAddressResults, setDisplayAddressResults] = useState(false);
  const [isInAddressResultsZone, setIsInAddressResultsZone] = useState(false);
  const [displayValidMessage, setDisplayValidMessage] = useState(false);

  const [contextState, contextDispatch] = useContext(UserContext);
  const { id, username, firstname, lastname, address, compostType } = contextState;

  const initialState = {
    newFirstname: firstname,
    newLastname: lastname,
    newUsername: username,
    newCompostType: compostType,
    newAddress: address,
    location: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'INPUTCHANGE':
        return {
          ...state,
          [action.name]: action.value,
        };
      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    newFirstname, newLastname, newUsername, newCompostType, newAddress, location,
  } = state;

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
   * @param {*} e
   */
  const handleOnFocusOnBlurInputAddress = (e) => {
    if (e._reactName === 'onFocus') setDisplayAddressResults(true);
    if (e._reactName === 'onBlur' && !isInAddressResultsZone) setDisplayAddressResults(false);
  };

  const handleOnSubmitForm = async (e) => {
    e.preventDefault();

    const data = {
      firstname: newFirstname,
      lastname: newLastname,
      username: newUsername,
      address: newAddress,
      compostType: newCompostType,
      longitude: location.lon,
      latitude: location.lat,
    };
    console.log(data);

    /*
    const response = await axios.post(
      'notreURL',
      data,
    );
    */

    // Faire condition : si la reponse retourne un status "ok" (code 200 ou 201) alors j'éxécute ceci :
    setDisplayValidMessage(true);
    setTimeout(() => {
      setDisplayValidMessage(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleOnSubmitForm} className="dashboard">
      <div>
        <label htmlFor="newFirstname">Prénom</label>
        <input
          id="newFirstname"
          name="newFirstname"
          type="text"
          placeholder="Prénom"
          value={newFirstname}
          onChange={(e) => dispatch({
            type: 'INPUTCHANGE',
            name: e.target.name,
            value: e.target.value,
          })}
        />
      </div>
      <div>
        <label htmlFor="newLastname">Nom</label>
        <input
          id="newLastname"
          name="newLastname"
          type="text"
          placeholder="Nom"
          value={newLastname}
          onChange={(e) => dispatch({
            type: 'INPUTCHANGE',
            name: e.target.name,
            value: e.target.value,
          })}
        />
      </div>
      <div>
        <label htmlFor="newUsername">Pseudo</label>
        <input
          id="newUsername"
          name="newUsername"
          type="text"
          placeholder="Pseudo"
          value={newUsername}
          onChange={(e) => dispatch({
            type: 'INPUTCHANGE',
            name: e.target.name,
            value: e.target.value,
          })}
        />
      </div>
      <div>
        <label htmlFor="newCompostType">Type de composteur</label>
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
          <option value="vert">Déchets verts</option>
          <option value="marron">Déchets marron</option>
          <option value="tous">Tous types de déchets compostables</option>
          <option value="aucun">Indisponible</option>
        </select>
      </div>
      <div className="dashboard_searchLocation">
        <label htmlFor="newAddress">Adresse</label>
        <input
          id="newAddress"
          name="newAddress"
          type="text"
          placeholder="Adresse"
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
      <button type="submit">Enregistrer</button>
      {displayValidMessage && <div className="dashboard_validMessage">Modifications enregistrées avec succès !</div>}
    </form>
  );
};

export default Dashboard;
