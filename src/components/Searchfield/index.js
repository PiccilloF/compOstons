import Field from 'src/components/Field';

export default function Searchfield() {
  return (
    <div className="searchfield__form__container">
      <p> Effectuer une recherche proche de chez vous </p>
      <form
        className="searchfield__form"
      >
        <Field
          placeholder="Ville"
          name="city"
        />
        <Field
          placeholder="Adresse"
          name="address"
        />
        <Field
          placeholder="Code postal"
          name="zipcode"
        />
        <button
          type="submit"
          className="searchfield__form__submit"
        >
          Rechercher
        </button>
      </form>
    </div>
  );
}
