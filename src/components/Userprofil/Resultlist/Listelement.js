import PropTypes from 'prop-types';

export default function Listelement({ result, handleClick }) {
  return (
    <div className="result-element">
      <li
        onClick={handleClick}
      >
        {result}
      </li>
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
