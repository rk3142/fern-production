import {createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import _ from 'lodash'
import {getAllProducts} from "../api";
import filters from '../filters.json'

const BreakException = {};

export const getAllCatalog = createAsyncThunk('catalog/getAllCatalog',
    async () => {
        return getAllProducts().then(res => {
            if (!res) return null
            return res
        })
})

const initialState = {
    products: [],
    filteredProducts: [],
    currentFilter: [],
    searchWord: '',
    status: 'idle',
    error: null
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
      addFilter: (state, {payload}) => {
          state.currentFilter.push({[payload.title]: payload.label})
      },
      removeFilter: (state, {payload}) => {
          state.currentFilter = state.currentFilter.filter(product => {
              return !_.isEqual(current(product), {[payload.title]: payload.label})
          })
      },
      filterProducts: (state, action) => {
          if (state.currentFilter.length <= 0) {
              state.filteredProducts = state.products
          } else {
              state.filteredProducts = state.products.filter(product => {
                  let isInclude = true
                  let productDetail, filterCategory, filterValue, filterDetails, filterMin, filterMax

                  try {
                      state.currentFilter.forEach(filter => {
                          filterCategory = Object.keys(filter)[0]
                          if (filterCategory === 'Price') productDetail = product['prices'][0]['price']
                          else productDetail = product[filterCategory.toLowerCase()]
                          filterValue = Object.values(filter)[0]
                          filterDetails = filters[filterCategory]['filter'][filterValue]
                          filterMin = filterDetails['min']
                          filterMax = filterDetails['max']
                          isInclude = filterMin <= productDetail && productDetail <= filterMax
                          if (isInclude) throw BreakException;
                      })
                  } catch (e) {
                      if (e !== BreakException) throw e;
                  }

                  return isInclude
              })
          }
      }
  },
    extraReducers: {
        [getAllCatalog.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllCatalog.fulfilled]: (state, {payload}) => {
            state.products = payload
            state.filteredProducts = payload
            state.status = 'success'
        },
        [getAllCatalog.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
});

export const { addFilter, removeFilter, filterProducts } = catalogSlice.actions;

export const selectProducts = (state) => state.catalog;

export default catalogSlice.reducer;
