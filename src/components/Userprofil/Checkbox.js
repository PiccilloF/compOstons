import PropTypes from 'prop-types';

export default function Checkbox({ labelName, name }) {
  return (
    <>
      <label htmlFor={name}>{labelName}</label>
      <input
        type="checkbox"
        name={name}
        id={name}
      />
    </>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
};
