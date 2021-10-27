// == Import
import { useEffect } from 'react';
// import des composants react leaflet
import {
  MapContainer,
  useMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';

import './styles.css';
// == Composant
// il faudrat rendre dynamique le center en fonction de la valeur saisie par l'utilisateur
// ne pas toucher au tileLayer, mention obligatoire
// le marker devra etre generé avec un .map en fonction de l'objet retourné par la bdd
//
const Map = () => {
  const apiKey = 'pk.eyJ1IjoiZmFvc3RvcGF0YXRhIiwiYSI6ImNrdWl3NDliNzBkdGMyb3BlbHBpMDJzeG0ifQ.bxULerfmYNS2daX0IIzdvA';
  const SearchField = () => {
    const provider = new MapBoxProvider({
      params: {
        access_token: apiKey,
      },
    });
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      style: 'bar',
      provider: provider,
      notFoundMessage: 'Désolé, l\'adresse saisie ne peut être trouvé',
      searchLabel: 'Trouver un point de compost près de chez vous',
      // showPopup: true,
      // autoClose: true,
      resultFormat: ({ result }) => (
        result.label
      ),
    });
    console.log(searchControl);
    const map = useMap();
    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  };
  return (
    <div className="app">
      <MapContainer center={[46.227638, 2.213749]} zoom={10}>
        <SearchField apiKey={apiKey} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[51.506, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[51.504, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[51.506, -0.091]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[51.506, -0.089]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

// == Export
export default Map;
