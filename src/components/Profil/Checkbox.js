import PropTypes from 'prop-types';

export default function Checkbox({ value, onChange, compostType }) {
  return (
    <input
      type="checkbox"
      value={value}
      onChange={onChange}
      name={compostType}
    />
  );
}

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  compostType: PropTypes.string.isRequired,
};
