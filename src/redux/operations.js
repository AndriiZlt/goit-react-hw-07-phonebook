import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://64a942668b9afaf4844a7729.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const removeContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    try {
      const res = await axios.delete(`${URL}/${id}`);
      return res;
    } catch (error) {
      console.log(`error in deleting item ${id}`, error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    const response = await axios.post(URL, newContact);
    return response.data;
  }
);
