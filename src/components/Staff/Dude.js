import PropTypes from 'prop-types';

export default function Dude({
  gitlogo,
  ...dude
}) {
  return (
    <div className="dude-profil_container">
      <h3 className="dude-title"> {dude.lastname}</h3>
      <div
        className="dude-picture"
      > <img src={dude.picture} alt={dude.alt} />
      </div>
      <div className="dude-job">{dude.job}</div>
      <div className="dude-infos">
        <a href={dude.infos}>
          <img
            src={gitlogo}
            alt="logo github"
          />
        </a>
      </div>
    </div>
  );
}

Dude.propTypes = {
  gitlogo: PropTypes.string.isRequired,
  dude: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    infos: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })),
};

Dude.defaultProps = {
  dude: [],
};
