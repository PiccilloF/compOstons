/* eslint-disable max-len */
// == Import
import { useEffect, useState } from 'react';

import { isPointWithinRadius } from 'geolib';

import axios from 'axios';

// import des composants react leaflet
import {
  MapContainer,
  useMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import {
  greenIcon,
  brownIcon,
  redIcon,
  lightGreenIcon,
} from 'src/components/Icons';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import List from './List';

import './styles.css';

// == Composant
// il faudrat rendre dynamique le center en fonction de la valeur saisie par l'utilisateur
// ne pas toucher au tileLayer, mention obligatoire
// le marker devra etre generé avec un .map en fonction de l'objet retourné par la bdd

// penser a passer la clé dans un .env ou équivalent react
const apiKey = 'pk.eyJ1IjoiZmFvc3RvcGF0YXRhIiwiYSI6ImNrdWl3NDliNzBkdGMyb3BlbHBpMDJzeG0ifQ.bxULerfmYNS2daX0IIzdvA';

// on sort le composant SearchFiel du Map et on lui passe une props pour save les coordonnées
const SearchField = ({ onShowLocation }) => {
  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    style: 'bar', // défini le format du champ de recherche
    provider: provider,
    notFoundMessage: 'Désolé, l\'adresse saisie ne peut être trouvé', // message en cas d'adresse fausse
    searchLabel: 'Trouver un point de compost près de chez vous', // le placeholder
    // showPopup: true,
    // autoClose: true,
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  useEffect(() => {
    map.on('geosearch/showlocation', (e) => {
      onShowLocation(e);
    });
  }, []);

  return null;
};

const Map = () => {
  // mes hook pour recuperer les coordonnées du résultat choisi par l'utilisateur
  const [coords, setCoords] = useState({ x: null, y: null });
  const [dataInfo, setDataInfo] = useState([]);
  const [newDataInfo, setNewDataInfo] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  // Au premier montage du composant =>

  useEffect(() => {
    axios.get('https://compostons.herokuapp.com/composts')
      .then((response) => {
        setDataInfo(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // si l'user rentre une adresse dans la searchBar cet useEffect est éxécuté =>

  useEffect(() => {
    // dataInfo est un tableau d'objet avec cette structure :
    // [{category, id, latitude, longitude, user_id, username}, ...]

    // si le tableau n'est pas vide alors on peut lancer la méthode isPointWithinRadius de géolib
    // Cette méthode vérifie si un un point gps et dans un périmètre(radius) donné autour d'un point gps de référence
    // isPointWithinRadius(point, centerPoint, radius)
    // elle renvoie True ou False
    if (dataInfo.length) {
      // d'abord on vide newDataInfo, dans l'hypothèse que l'user ai déjà fait une recherche, cela évite d'avoir des doublons
      // et donc des problèmes de key identiques dans notre liste de résultats
      setNewDataInfo([]);
      dataInfo.forEach((element) => {
        const isInPerimeter = isPointWithinRadius({ latitude: element.latitude, longitude: element.longitude }, { latitude: coords.y, longitude: coords.x }, 150000);

        // si le résultat est true alors j'insère l'élèment en cours dans newDataInfo grâce à setNewDataInfo
        if (isInPerimeter) {
          // on ne peut pas simplement insérer l'élement(objet), sans aussi déverser ce qu'il y avait au préalable dans ce tableau
          // si on insère simplement l'élement(objet) en cours alors il n'y aurait toujours qu'un seul élement(objet)
          // dans newDataInfo
          setNewDataInfo((prevState) => [...prevState, element]);
        }
      });
    }
  }, [coords]);

  // Factorisation pour l'affichage des marqueurs
  // Fonction qui prend un argument un tableau
  const displayMarker = (data) => data.map((marker) => {
    let messageAvailability = null;
    let iconType = null;

    switch (marker.category) {
      case 'marron':
        messageAvailability = 'Accepte les déchets de type brun';
        iconType = brownIcon;
        break;
      case 'vert':
        messageAvailability = 'Accepte les déchets de type vert';
        iconType = lightGreenIcon;
        break;
      case 'tous types':
        messageAvailability = 'Accepte tous types de déchets compostable';
        iconType = greenIcon;
        break;
      default:
        messageAvailability = 'N\'accepte pas de déchets pour le moment';
        iconType = redIcon;
        break;
    }

    return (
      <Marker
        key={marker.id}
        position={[marker.latitude, marker.longitude]}
        icon={iconType}
        eventHandlers={{
          click: () => {
            setSelectedId(marker.id);
          },
        }}
      >
        <Popup>
          {marker.username} <br />
          {messageAvailability}
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="map">
      <div className="map-leaflet">
        <div className="map-title">
          <h1 className="welcome-title">Bienvenue sur CompOstons</h1>
          <p className="intro">
            Notre but est de faciliter la mise en relation entre les personnes  qui
            souhaitent proposer leur composte et les personnes qui souhaitent réduire leurs
            déchets ménager.
          </p>
          <p className="map-use">
            Trouvez dès maintenant les points de compost les plus proches de chez vous en
            saisissant votre adresse.
          </p>
        </div>

        <MapContainer center={[46.9, 2.61878695312962]} zoom={5.5}>
          <SearchField
            apiKey={apiKey}
            onShowLocation={(e) => {
              setCoords({ x: e.location.x, y: e.location.y });
            }}
          />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            // si la length de newDataInfo est supérieur à 0 on passe en argument newDataInfo
            // si newDataInfo est inférieur a 0 on passe dataInfo en argument à la fonction displayMarker
            newDataInfo.length > 0
              ? displayMarker(newDataInfo)
              : displayMarker(dataInfo)
          }
        </MapContainer>
      </div>
      {
        // si la length de newDataInfo est supérieur à 0 on passe newDataInfo en props au composant List
        // si newDataInfo est inférieur à 0 on passe dataInfo en props au composant List
        newDataInfo.length > 0
          ? <List dataInfo={newDataInfo} />
          : <List dataInfo={dataInfo} />
      }
    </div>
  );
};

// == Export
export default Map;
