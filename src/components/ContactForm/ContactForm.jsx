import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import shortid from 'shortid';
import GetSelector from 'redux/selectors';

export default function ContactForm() {
  const dispatch = useDispatch();
  const { contacts } = GetSelector();
  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const { name } = e.currentTarget;
    let isTaken = false;
    for (let contact of contacts) {
      if (contact.name.toString().toLowerCase() === name.value.toLowerCase()) {
        isTaken = true;
        continue;
      }
    }

    if (!isTaken) {
      dispatch(
        addContact({
          name: e.target.name.value,
          phone: e.target.number.value,
          id: shortid.generate(),
        })
      );
    } else {
      alert(`${name.value} is already in contacts.`);
    }
    form.reset();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={css.form}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            maxLength="32"
            className={css.input}
            pattern="^(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/)?[a-z0-9-~][a-z0-9-._~]*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          Telephone
          <input
            type="tel"
            name="number"
            className={css.input}
            pattern="[0-9]+"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </div>
  );
}
