import { useState } from 'react';
import PropTypes from 'prop-types';
import useModal from 'src/hooks/useModal';
import Modal from 'src/components/Map/Modal';
import Card from './Card';

import './styles.css';

const List = ({ dataInfo }) => {
  const { isOpen, toggle } = useModal();
  const [pointOwner, setPointOwner] = useState({ pseudo: 'toto', userId: 123 });
  // si pas de coordonnées dans le hook alors on renvoi une phase
  // pour inviter l'utilisateur a se co
  const counterTitle = (length) => {
    let title = 'Aucun point de compostage trouvé';

    if (length === 1) {
      title = '1 point de compostage trouvé';
    }
    else if (length > 1) {
      title = `${length} points de compostage trouvés`;
    }
    return title;
  };
  return (
    <div className="list">
      {!dataInfo && (
        <h1 className="list-title">
          Saisissez une adresse pour trouver les points de compost les plus proches
        </h1>
      )}
      {dataInfo && (
        <>
          <h1 className="list-title">
            {counterTitle(dataInfo.length)}
          </h1>
          <div className="list-marker">
            {dataInfo.map((dataMarker) => {
              // en fonction de la donnée dans category je veux pouvoir faire
              // varier le message afficher dans ma card et son style
              let messageAvailability = null;
              switch (dataMarker.category) {
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
                <Card
                  key={dataMarker.id}
                  pseudo={dataMarker.username}
                  message={messageAvailability}
                  userId={dataMarker.user_id}
                  toggle={toggle}
                  setOwnerPoint={setPointOwner}
                />
              );
            })}
          </div>
          <Modal isOpen={isOpen} hide={toggle} pointOwner={pointOwner} />
        </>
      )}
    </div>
  );
};

List.propTypes = {
  dataInfo: PropTypes.array,
};

List.defaultProps = {
  dataInfo: null,
};

export default List;
