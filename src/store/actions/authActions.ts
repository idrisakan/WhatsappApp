import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const getCoutriesCode = createAsyncThunk('auth/getCoutriesCode', async () => {

  try {
    const response = await firestore().collection('Countries').get();
    const data = response.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {}
});


export {getCoutriesCode};
