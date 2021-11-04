import PropTypes from 'prop-types';

import Listelement from './Listelement';

export default function Resultlist({ addressResults, onChange }) {
  const jsxResults = addressResults.map((item) => (
    <Listelement
      key={item.id}
      result={item.label}
      handleClick={onChange}
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
  onChange: PropTypes.func.isRequired,
};

Resultlist.defaultProps = {
  addressResults: [],
};
