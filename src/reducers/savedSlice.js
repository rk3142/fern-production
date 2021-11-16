import {createSlice, current} from '@reduxjs/toolkit';
import _ from 'lodash'

const initialState = {
    saved: []
};

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
      addSaved: (state, {payload}) => {
          state.saved.push(payload)
      },
      removeSaved: (state, {payload}) => {
          state.saved = state.saved.filter(item => {
              return !_.isEqual(current(item), payload)
          })
      }
  }
});

export const { addSaved, removeSaved } = savedSlice.actions;

export const selectSaved = (state) => state.saved.saved;

export default savedSlice.reducer;
