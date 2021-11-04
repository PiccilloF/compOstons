import PropTypes from 'prop-types';

export default function Listelement({ result, handleClick }) {
  return (
    <div className="result_element">
      <input
        type="search"
        onChange={handleClick}
        value={result}
      />
    </div>
  );
}

Listelement.propTypes = {
  result: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Listelement.defaultProps = {
  result: '',
};
