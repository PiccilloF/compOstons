/* eslint-disable arrow-body-style */

import { Route, Switch, Redirect } from 'react-router-dom';

// Import des composants
import Header from 'src/components/Header';
import Map from 'src/components/Map';
import Userprofil from 'src/components/Userprofil';

import './styles.css';

// == Composant

const App = () => {
  // const { isOpen, toggle } = useModal();
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Map />
        </Route>
        <Route path="/profil" exact>
          <Userprofil />
        </Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
