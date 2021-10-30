/* eslint-disable jsx-a11y/label-has-associated-control */
import Field from './Field';
import Checkbox from './Checkbox';

export default function Userprofil() {
  return (
    <div className="main-profil__container">
      <div className="user-profil">
        <p>Vos Informations</p>
        <form
          className="main-profil__form"
          onSubmit={' '}
        >
          <div className="user-infos">
            <div className="input-fields">
              <Field
                name="firstname"
                labelName="Prénom: "
              />
              <Field
                name="lastname"
                labelName="Nom: "
              />
              <Field
                name="alias"
                labelName="Pseudo: "
              />
              <button
                type="submit"
                id="delete-profil__button"
              >supprimer ce compte
              </button>
              <div className="profil-picture__container">
                <div className="profil-picture">mon image</div>
                <input type="file" id="picture-input" />
              </div>
              <div className="compost-infos">
                <div className="compost-checkbox-block">
                  <Checkbox
                    name="greenType"
                    labelName="Déchets verts"
                  />
                  <Checkbox
                    name="brownType"
                    labelName="Déchets bruns"
                  />
                  <Checkbox
                    name="kitchenType"
                    labelName="Déchets ménagers"
                  />
                  <Checkbox
                    name="notAvailable"
                    labelName="Je n'accepte pas de déchets en ce moment"
                  />
                </div>
                <div className="compost-inputs-block">
                  <Field
                    name="address"
                    labelName="Addresse: "
                  />
                  <Field
                    name="zipcode"
                    labelName="Code postale: "
                  />
                  <Field
                    name="city"
                    labelName="Ville: "
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            id="register-profil__button"
            type="submit"
          >sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
}
