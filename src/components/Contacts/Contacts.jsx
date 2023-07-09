import { Ul, Li, Btn } from './Contacts.styled';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from 'redux/store';
import { fetchContacts } from 'redux/store';
import { useEffect } from 'react';
import shortid from 'shortid';
const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);
  const filteredContacts = contacts.filter(contact => {
    return contact.name.toString().toLowerCase().includes(filter.toLowerCase());
  });

  return contacts.length > 0 ? (
    filteredContacts.length > 0 ? (
      <Ul>
        {filteredContacts.map(({ id, name, phone }) => (
          <Li key={shortid.generate()}>
            {name.toString()} {phone.toString()}
            {
              <Btn
                type="button"
                id={id}
                onClick={() => dispatch(removeContact(id))}
              >
                Delete
              </Btn>
            }
          </Li>
        ))}
      </Ul>
    ) : (
      <>No matches</>
    )
  ) : (
    <>
      <p>Add some contacts</p>
    </>
  );
};

export default ContactList;
