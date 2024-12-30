import {createSlice} from '@reduxjs/toolkit';
import {getCoutriesCode} from '../actions/authActions';
import { ChatTypes } from '../../models/data/chats/chat';

const initialState: ChatTypes = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
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
// export const {setCountry, setPhoneNumber, setName, setSurname} =
//   chatSlice.actions;
export default chatSlice.reducer;
