/* eslint-disable arrow-body-style */

// Import des composants
import Header from 'src/components/Header';
// import Modal from 'src/components/Modal';
// import useModal from 'src/hooks/useModal';
import Map from 'src/components/Map';
import Userprofil from 'src/components/Userprofil';


import './styles.css';

// == Composant

const App = () => {
  // const { isOpen, toggle } = useModal();
  return (
    <div className="app">
      <Header />
      <Userprofil />
    </div>
  );
};

// == Export
export default App;
