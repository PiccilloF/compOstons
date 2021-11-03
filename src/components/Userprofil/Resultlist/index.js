import PropTypes from 'prop-types';

import Listelement from './Listelement';

export default function Resultlist({ addressResults, onClick }) {
  console.log(addressResults);
  const jsxResults = addressResults.map((item) => (
    <Listelement
      key={item}
      result={item}
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
  addressResults: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};

Resultlist.defaultProps = {
  addressResults: [],
};
