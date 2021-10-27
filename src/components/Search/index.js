import { useEffect } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';

import './styles.css';

const MyMap = () => {
  const apiKey = 'pk.eyJ1IjoiZmFvc3RvcGF0YXRhIiwiYSI6ImNrdWl3NDliNzBkdGMyb3BlbHBpMDJzeG0ifQ.bxULerfmYNS2daX0IIzdvA';
  const showSearch = true;
  const SearchField = () => {
    const provider = new MapBoxProvider({
      params: {
        access_token: apiKey,
      },
    });
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
    });

    const map = useMap();
    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };
  return (
    <MapContainer>
      {showSearch && <SearchField apiKey={apiKey} />}

    </MapContainer>
  );
};

export default MyMap;
