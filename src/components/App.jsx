import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './Contacts/Contacts';
// import { useSelector } from 'react-redux';
// import Loading from './Loading/Loading';

export default function App() {
  // const error = useSelector(state => state.error);

  return (
    <div
      style={{
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontSize: 20,
          color: '#010101',
          fontFamily: 'Roboto',
        }}
      >
        <div style={{ marginRight: 50 }}>
          <ContactForm />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>Contacts:</h2>
          <Filter />
          <ContactList />
        </div>
      </div>
    </div>
  );
}
