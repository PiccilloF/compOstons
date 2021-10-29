// Import des composants
// == Import
import Header from 'src/components/Header';
import Modal from 'src/components/Modal';
import useModal from 'src/hooks/useModal';
import './styles.css';
// == Composant

const App = () => {
  const { isOpen, toggle } = useModal();

  return (
    <div className="app">
      <Header onClickLogin={toggle} />
      <Modal isOpen={isOpen} hide={toggle} />
    </div>
  );
};

// == Export
export default App;
