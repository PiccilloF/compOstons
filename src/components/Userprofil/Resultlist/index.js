import PropTypes from 'prop-types';

import Listelement from './Listelement';

export default function Resultlist({ addressResults, onClick }) {
  const jsxResults = addressResults.map((item) => (
    <Listelement
      key={item.id}
      result={item.label}
      handleClick={onClick}
    />
  ));
  return (
    <ul>
      {jsxResults}
    </ul>
  );
}

Resultlist.propTypes = {
  addressResults: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};

Resultlist.defaultProps = {
  addressResults: [],
};
