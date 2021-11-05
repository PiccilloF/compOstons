// == Import
import { useEffect, useState } from 'react';
import axios from 'axios';
// import des composants react leaflet
import {
  MapContainer,
  useMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import List from './List';

import './styles.css';
// == Composant
// il faudrat rendre dynamique le center en fonction de la valeur saisie par l'utilisateur
// ne pas toucher au tileLayer, mention obligatoire
// le marker devra etre generé avec un .map en fonction de l'objet retourné par la bdd
//

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
  const [dataInfo, setDataInfo] = useState();
  // le useEffect pour executer la requete à la base de données
  useEffect(() => {
    if (coords.x) {
      console.log(`x :  ${coords.x}`);
      console.log(`y :  ${coords.y}`);
      // penser a repasser la requete en post et de passer l'objet {coords} après le test
      axios.get('https://compostons.herokuapp.com/composts')
        .then((response) => {
          setDataInfo(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [coords]);

  console.log(dataInfo);
  return (
    <div className="map">
      <MapContainer center={[47.8249046208979, 2.61878695312962]} zoom={5}>
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
        {dataInfo && (
          dataInfo.map((marker) => {
            let messageAvailability = null;
            switch (marker.category) {
              case 'marron':
                messageAvailability = 'Accepte les dechets de type brun';
                break;
              case 'vert':
                messageAvailability = 'Accepte les dechets de type vert';
                break;
              case 'tous types':
                messageAvailability = 'Accepte tous types de dechets compostable';
                break;
              default:
                messageAvailability = 'N\'accepte pas de dechets pour le moment';
                break;
            }
            return (
              <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                <Popup>
                  {marker.username} <br />
                  {messageAvailability}
                </Popup>
              </Marker>
            );
          })
        )};
      </MapContainer>
      <List dataInfo={dataInfo} />
    </div>
  );
};

// == Export
export default Map;
