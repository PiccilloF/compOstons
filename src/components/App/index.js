// Import des composants
import Searchfield from 'src/components/Searchfield';
// == Import
import Header from 'src/components/Header';
import Login from 'src/components/Login';
import useModal from 'src/hooks/useModal';
import './styles.css';

// == Composant

const App = () => {
  const { isOpen, toggle } = useModal();
  return (
    <div className="app">
      <Searchfield onFormSubmit={[]} />
      <Header onClickLogin={toggle} />
      <Login isOpen={isOpen} hide={toggle} />
    </div>
  );
};

// == Export
export default App;
