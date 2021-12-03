import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAllProducts, getProductsBySearch} from "../api";
import filters from '../filters.json'

export const getAllCatalog = createAsyncThunk('catalog/getAllCatalog',
    async () => {
        return getAllProducts().then(res => {
            if (!res) return null
            return res
        })
})

export const getCatalogBySearch = createAsyncThunk('catalog/getCatalogBySearch',
    async ({searchWord}) => {
        return getProductsBySearch(searchWord).then(res => {
            if (!res) return null
            return res
        })
})

const initialState = {
    products: [],
    filteredProducts: [],
    currentFilter: {},
    searchWord: '',
    isSearch: true,
    status: 'idle',
    error: null
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
      setSearchWord: (state, {payload}) => {
          state.searchWord = payload.searchWord
          state.isSearch = payload.isSearch
      },
      addFilter: (state, {payload}) => {
          if (!state.currentFilter[payload.title]) state.currentFilter[payload.title] = []
          state.currentFilter[payload.title].push(payload.label)
      },
      removeFilter: (state, {payload}) => {
          let updatedFilter = {}
          for (const [key, value] of Object.entries(state.currentFilter)) {
              if (!updatedFilter[key]) updatedFilter[key] = []
              value.forEach(val => {
                  if (key === payload.title && val === payload.label) return
                  updatedFilter[key].push(val)
              })
          }
          state.currentFilter = updatedFilter
      },
      filterProducts: (state,) => {
          let filterCount = 0
          for (const [, val] of Object.entries(state.currentFilter)) {
              filterCount += val.length
          }

          // If no filter, display all
          if (filterCount === 0) {
              state.filteredProducts = state.products
          } else {
              // Filter through the products
              state.filteredProducts = state.products.filter(product => {
                  let isInclude = []
                  // Check if product complies with each filter category
                  // If two categories, the array length will be 2
                  for (let i = 0; i < state.currentFilter.length; i++) isInclude.push(false)

                  let productDetail, filterDetails, filterMin, filterMax

                  let index = 0
                  for (const [filterCategory, filterValueArray] of Object.entries(state.currentFilter)) {
                      if (filterCategory === 'Price') productDetail = product['prices'][0]['price']
                      else productDetail = product[filterCategory.toLowerCase()]

                      // Loop through the filter values and determine if the product matches the filter constraint
                      filterValueArray.forEach(filterValue => {
                          filterDetails = filters[filterCategory]['filter'][filterValue]
                          filterMin = filterDetails['min']
                          filterMax = filterDetails['max']

                          // Keep track of if this product should be included
                          isInclude[index] = isInclude[index] || (filterMin <= productDetail && productDetail <= filterMax)
                      })
                      index++
                  }

                  // Take the AND of the filters since they are from different categories
                  return isInclude.reduce((prev, curr) => prev && curr)
              })
          }
      }
  },
    extraReducers: {
        [getAllCatalog.pending]: (state,) => {
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
        [getCatalogBySearch.pending]: (state,) => {
            state.status = 'loading'
        },
        [getCatalogBySearch.fulfilled]: (state, {payload}) => {
            state.products = payload
            state.filteredProducts = payload
            state.status = 'success'
        },
        [getCatalogBySearch.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
});

export const { addFilter, removeFilter, filterProducts, setSearchWord } = catalogSlice.actions;

export const selectProducts = (state) => state.catalog;

export default catalogSlice.reducer;
