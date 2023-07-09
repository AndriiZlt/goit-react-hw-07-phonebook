import {
  configureStore,
  combineReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(
    'https://64a942668b9afaf4844a7729.mockapi.io/contacts'
  );
  return response.data;
});

export const removeContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    try {
      const res = await axios.delete(
        `https://64a942668b9afaf4844a7729.mockapi.io/contacts/${id}`
      );
      return res;
    } catch (error) {
      console.log(`error in deleting item ${id}`, error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    const response = await axios.post(
      `https://64a942668b9afaf4844a7729.mockapi.io/contacts/`,
      newContact
    );
    return response.data;
  }
);

const contactsSlice = createSlice({
  name: 'Phonebook',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      return {
        ...state,
        contacts: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(fetchContacts.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchContacts.rejected, (state, { payload }) => {
      return { ...state, error: payload };
    });
    builder.addCase(removeContact.fulfilled, (state, action) => {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload.data.id
        ),
      };
    });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    });
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const { changeFilter } = filterSlice.actions;

export default contactsSlice.reducer;
