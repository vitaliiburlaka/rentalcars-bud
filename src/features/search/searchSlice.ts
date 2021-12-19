import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchSearch } from './searchAPI'
import type { Suggestions } from './types'

export interface SearchState {
  data: Suggestions | any
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

export const initialState: SearchState = {
  data: {},
  status: 'idle',
  error: null,
}

export const fetchSearchAsync = createAsyncThunk(
  'search/fetchSearch',
  async (solrTerm: string) => {
    const response = await fetchSearch(solrTerm)
    return response.data
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.data = action.payload
      })
      .addCase(fetchSearchAsync.rejected, (state) => {
        state.data = {}
        state.status = 'failed'
        state.error = 'Oops, something went wrong, please try again later.'
      })
  },
})

export const selectSearchData = (state: RootState) => state.search.data
export const selectSearchStatus = (state: RootState) => state.search.status

export default searchSlice.reducer
