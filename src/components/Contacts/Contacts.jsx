import { Ul, Li, Btn } from './Contacts.styled';
import { useDispatch } from 'react-redux';
import { fetchContacts, removeContact } from 'redux/operations';
import { useEffect } from 'react';
import shortid from 'shortid';
import GetSelector from 'redux/selectors';

const ContactList = () => {
  const { filter, contacts } = GetSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
