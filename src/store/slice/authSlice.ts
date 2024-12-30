import {createSlice} from '@reduxjs/toolkit';
import {CountriesTypes} from '../../models/data/auth/auth';
import {getCoutriesCode} from '../actions/authActions';

const initialState: CountriesTypes = {
  phoneNumber: '',
  countries: [],
  pendingContriesCode: false,
  name: '',
  surname: '',
  selectedCountry: {
    id: 1,
    code: '+90',
    country: 'Türkiye',
  },
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCoutriesCode.pending, state => {
        state.pendingContriesCode = true;
      })
      .addCase(getCoutriesCode.fulfilled, (state, action) => {
        state.pendingContriesCode = false;
        state.countries = action.payload;
      })
      .addCase(getCoutriesCode.rejected, state => {
        state.pendingContriesCode = false;
      });
  },
});
export const {setCountry, setPhoneNumber,setName,setSurname} = authSlice.actions;
export default authSlice.reducer;
