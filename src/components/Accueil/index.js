import useModal from 'src/components/InscriptionModal/useModal';
import InscriptionModal from 'src/components/InscriptionModal';
// import Field from 'src/components/Field';

export default function Accueil() {
  const { isShowing, toggle } = useModal();

  return (
    <div className="homepage">
      <button
        type="button"
        className="modal-toggle"
        onClick={toggle}
      >
        Show modal
      </button>
      <InscriptionModal
        isShowing={isShowing}
        hide={toggle}
      >
        <form className="inscription-form">
          <input
            placeholder="Pseudo"
            name="pseudo"
          />
          <input
            placeholder="Code Postal"
            name="zipcode"
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
          />
          <input
            placeholder="Mot de passe"
            name="password"
            type="password"
          />
          <input
            placeholder="Confirmation Mot de passe"
            name="confirm"
            type="password"
          />
          <input
            name="proposal"
            type="checkbox"
            Value="Proposeur"
          /> Je propose
          <input
            name="proposal"
            type="checkbox"
            Value="Receveur"
          /> Je reçois
          <button
            type="submit"
            className="inscription-form__submit"
          >
            S'inscrire
          </button>
        </form>
      </InscriptionModal>
    </div>
  );
}
