/* eslint-disable arrow-body-style */

// Import des composants
import Header from 'src/components/Header';
import Map from 'src/components/Map';
import Userprofil from 'src/components/Userprofil';
import Dashboard from '../Dashboard';

// import background from 'src/assets/background.webp';
import './styles.css';

// == Composant

const App = () => {
  // const { isOpen, toggle } = useModal();
  return (
    <div className="app">
      <Header />
      <Dashboard />
    </div>
  );
};

// == Export
export default App;
