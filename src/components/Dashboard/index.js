/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */
import { useEffect, useReducer, useState, useContext } from 'react';
import { UserContext } from 'src/context/userContext';
// Import d'axios pour les requêtes
import axios from 'axios';
// J'importe le hook useModal pour générer ma modal de confirmation
// de suppression d'utilisateur.
import useModal from 'src/hooks/useModal';
import Modalconfirm from './Modalconfirm';

import './styles.scss';

const initialState = {
  newFirstname: '',
  newLastname: '',
  newUsername: '',
  newCategory: '',
  newAddress: '',
  newMail: '',
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
  const { isOpen, toggle } = useModal();
  // Gestion des états:
  const [addressResults, setAddressResults] = useState([]);
  const [displayAddressResults, setDisplayAddressResults] = useState(false);
  const [isInAddressResultsZone, setIsInAddressResultsZone] = useState(false);
  const [displayValidMessage, setDisplayValidMessage] = useState(false);

  // On récupère le context et l'initialState
  const [contextState, contextDispatch] = useContext(UserContext);
  const { id, username, firstname, lastname, address, category, jwtToken, mail } = contextState;

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    newFirstname, newLastname, newUsername, newCategory, newAddress, location, newMail,
  } = state;

  useEffect(() => {
    dispatch({
      type: 'INITIALVALUE',
      initialValue: {
        newFirstname: firstname,
        newLastname: lastname,
        newUsername: username,
        newCategory: category,
        newAddress: address,
        newMail: mail,
      },
    });
  }, [id, username, firstname, lastname, address, category]);

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

  // Soumission du formulaire de mise à jour des données de profil
  // Envoi du token pour vérification de l'autorisation et mise à jour
  // des states via l'action UPDATE.
  // Affiche un message de confirmation pour l'enregistrement.
  const handleOnSubmitForm = (event) => {
    event.preventDefault();
    const token = {
      headers: { authorization: `Bearer ${jwtToken}` },
    };
    const data = {
      firstname: newFirstname,
      lastname: newLastname,
      username: newUsername,
      address: newAddress,
      category: newCategory,
      mail: newMail,
      longitude: location.lon,
      latitude: location.lat,
    };
    console.log(data);

    axios.put(`https://compostons.herokuapp.com/users/${id}`, data, token)
      .then((response) => {
        console.log(response);

        const newData = {
          username: response.data.user.username ? response.data.user.username : '',
          firstname: response.data.user.firstname ? response.data.user.firstname : '',
          lastname: response.data.user.lastname ? response.data.user.lastname : '',
          address: response.data.compost.address ? response.data.compost.address : '',
          compostId: response.data.compost.id ? response.data.compost.id : 0,
          category: response.data.compost.category ? response.data.compost.category : '',
          mail: response.data.user.mail ? response.data.user.mail : '',
          updated_at: response.data.user.updated_at ? response.data.user.updated_at : '',
        };

        contextDispatch({
          type: 'UPDATE',
          payload: newData,
        });

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

  // Requête axios pour la suppression d'un point de compostage utilisateur
  // vide les datas address et category dans la base.
  // Dispatch l'action UPDATE et vide les champs address et category
  const handleDeleteCompost = () => {
    console.log('test suppression compost');
    axios.delete(`https://compostons.herokuapp.com/composts/${id}`)
      .then((response) => {
        const newData = {
          address: '',
          category: '',
        };

        contextDispatch({
          type: 'UPDATE',
          payload: newData,
        });
        console.log(response);
        console.log('compost supprimé');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div className="dashboard_container">
      <h1 className="dashboard_container-title">Gestion du profil</h1>
      <div className="picture-zone_container">
        <div className="profil-picture-zone">
          <div className="profil-picture">mon image</div>
          <input type="file" id="picture-input" />
        </div>
      </div>
      <form onSubmit={handleOnSubmitForm} className="dashboard_form_container">
        <div className="dashboard_form-blocks">
          <div className="user_infos">
            <h2 className="section_title"> Mes informations </h2>
            <div className="user_infos-inputs">
              <div className="user_infos-input_element">
                <label htmlFor="newFirstname" className="input_label">Prénom </label>
                <input
                  className="input_field"
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
              <div className="user_infos-input_element">
                <label htmlFor="newLastname" className="input_label">Nom </label>
                <input
                  className="input_field"
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
              <div className="user_infos-input_element">
                <label htmlFor="newUsername" className="input_label">Pseudo </label>
                <input
                  className="input_field"
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
              <div className="user_infos-input_element">
                <label htmlFor="newMail" className="input_label">Email </label>
                <input
                  className="input_field"
                  id="newMail"
                  name="newMail"
                  type="email"
                  value={newMail}
                  onChange={(e) => dispatch({
                    type: 'INPUTCHANGE',
                    name: e.target.name,
                    value: e.target.value,
                  })}
                />
              </div>
            </div>
          </div>
          <div className="compost_infos">
            <h2 className="section_title"> Mon compost </h2>
            <div className="compost_infos-select">
              <label htmlFor="newCategory" className="input_label">Type de déchets acceptés </label>
              <select
                id="newCategory"
                name="newCategory"
                type="text"
                value={newCategory}
                onChange={(e) => dispatch({
                  type: 'INPUTCHANGE',
                  name: e.target.name,
                  value: e.target.value,
                })}
              >
                <option className="compost_infos-select-option" value="vert">Déchets verts</option>
                <option className="compost_infos-select-option" value="marron">Déchets marron</option>
                <option className="compost_infos-select-option" value="tous types">Tous types de déchets compostables</option>
                <option className="compost_infos-select-option" value="aucun">Indisponible</option>
              </select>

            </div>
            <div className="dashboard_searchLocation">
              <label htmlFor="newAddress" className="input_label">Localisation du compost </label>
              <input
                className="dashboard_searchLocation-input"
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
            <div className="compost_infos-footer">
              <p className="delete-paragraph">Je supprime mon point de compostage :</p>
              <button
                className="delete__button"
                type="button"
                onClick={handleDeleteCompost}
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
            onClick={toggle}
          >
            Je supprime mon compte
          </button>
          <Modalconfirm isOpen={isOpen} hide={toggle} />
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
