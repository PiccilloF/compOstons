import { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useModal from 'src/hooks/useModal';
import Modal from 'src/components/Map/Modal';
// Context
import { UserContext } from 'src/context/userContext';
import Card from './Card';

import './styles.scss';

const List = ({ dataInfo, selectedId }) => {
  const { isOpen, toggle } = useModal();
  const [state] = useContext(UserContext);
  const { isLogged } = state;
  const [pointOwner, setPointOwner] = useState({ pseudo: 'toto', userId: 123 });

  const listZone = useRef(null);
  const cardItem = useRef(null);

  useEffect(() => {
    if (cardItem.current) {
      const heightToSkip = listZone.current.childNodes[0].offsetTop;
      listZone.current.scrollTo({
        top: (cardItem.current.offsetTop - heightToSkip),
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [cardItem, selectedId]);

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
      {dataInfo && (
        <>
          <h1 className="list-title">
            {counterTitle(dataInfo.length)}
          </h1>
          <div className="list-marker" ref={listZone}>
            {dataInfo.map((dataMarker) => {
              // en fonction de la donnée dans category je veux pouvoir faire
              // varier le message afficher dans ma card et son style
              let messageAvailability = null;
              switch (dataMarker.category) {
                case 'marron':
                  messageAvailability = 'Accepte les déchets de type brun';
                  break;
                case 'vert':
                  messageAvailability = 'Accepte les déchets de type vert';
                  break;
                case 'tous types':
                  messageAvailability = 'Accepte tous types de déchets compostable';
                  break;
                default:
                  messageAvailability = 'N\'accepte pas de déchets pour le moment';
                  break;
              }
              return (
                <Card
                  key={dataMarker.id}
                  pseudo={dataMarker.username}
                  message={messageAvailability}
                  userId={dataMarker.user_id}
                  toggleLinking={toggle}
                  setOwnerPoint={setPointOwner}
                  isLogged={isLogged}
                  selectedId={selectedId}
                  ref={cardItem}
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
  selectedId: PropTypes.number,
};

List.defaultProps = {
  dataInfo: null,
  selectedId: null,
};

export default List;
