import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, removeContact, addContact } from './operations';

export const contactsSlice = createSlice({
  name: 'Phonebook',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return {
          ...state,
          contacts: action.payload,
          isLoading: false,
          error: null,
        };
      })
      .addCase(fetchContacts.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        return { ...state, error: payload };
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        return {
          ...state,
          contacts: state.contacts.filter(
            contact => contact.id !== action.payload.data.id
          ),
        };
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addDefaultCase((state, action) => state);
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});
