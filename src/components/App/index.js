/* eslint-disable arrow-body-style */

import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';

// Context
import { UserContext } from 'src/context/userContext';

// Import des composants
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Map from 'src/components/Map';
import Dashboard from 'src/components/Dashboard';
import Articles from 'src/components/Articles';
import Article from 'src/components/Article';
import Error from 'src/components/Error';

import './styles.css';

// == Composant

const App = () => {
  const [state, dispatch] = useContext(UserContext);
  const { isLogged } = state;

  return (
    <div
      className="app"
      style={
        {
          backgroundImage: 'url(/background.webp)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
        }
      }

    >
      <Header />
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Map />
          </Route>
          {
            isLogged
              ? (
                <Route path="/profil">
                  <Dashboard />
                </Route>
              )
              : (
                <Redirect from="/profil" to="/" />
              )
          }
          <Route path="/articles">
            <Article />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

// == Export
export default App;
