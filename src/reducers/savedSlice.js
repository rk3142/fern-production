import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import _ from 'lodash'
import {addBookmark, getAllBookmarks, removeBookmark} from "../api";

export const getAllSavedItem = createAsyncThunk('saved/getAllSaved',
    async () => {
        return getAllBookmarks().then(res => {
            if (!res) return null
            return res
        })
})

export const addSavedItem = createAsyncThunk('saved/addSavedItem',
    async (productId) => {
        return addBookmark(productId)
})

export const removeSavedItem = createAsyncThunk('saved/removeSavedItem',
    async (productId) => {
        return removeBookmark(productId)
})

const initialState = {
    saved: [],
    status: 'idle'
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
    },
    extraReducers: {
        [getAllSavedItem.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllSavedItem.fulfilled]: (state, {payload}) => {
            state.saved = payload
            state.status = 'success'
        },
        [getAllSavedItem.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});

export const { addSaved, removeSaved } = savedSlice.actions;

export const selectSaved = (state) => state.saved.saved;

export default savedSlice.reducer;
