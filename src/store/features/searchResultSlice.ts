import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';
import {Recipe} from "../../types";
import {AutocompleteValues} from "../../types";

interface SearchResultState {
    recipes: Recipe[]
    nextPageUrl: string | null
    loading: boolean
    error: string | null
    loadingMore: boolean
}

const initialState: SearchResultState = {
    recipes: [],
    nextPageUrl: null,
    loading: false,
    error: null,
    loadingMore:false,
}

export const fetchSearchResults = createAsyncThunk(
    'searchResult/fetchSearchResults',
    async ({ searchKey, advancedFilters }: { searchKey: string|null; advancedFilters: AutocompleteValues|null}, { rejectWithValue }) => {
        const url = `https://api.edamam.com/api/recipes/v2`
        const params = {
            type: 'public',
            app_id: '6a9023d2',
            app_key: '504bf641b2dc1576406ca02650c5f73a',
            q: searchKey,
            ...advancedFilters
        }

        try {
            const response = await axios.get(url, { params });
            const data = response.data
            if (data.count) {
                return {
                    nextPageUrl: data._links.next?.href,
                    recipes: data.hits.map((hit: any) => hit.recipe),
                }
            } else {
                return rejectWithValue('No results found')
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchMoreSearchResults = createAsyncThunk(
    'searchResult/fetchNextPage',
    async (nextPageUrl:string, { rejectWithValue }) => {

        try {
            const response = await axios.get(nextPageUrl)
            const data = response.data
            if (data.count) {
                return {
                    nextPageUrl: data._links.next?.href,
                    recipes: data.hits.map((hit: any) => hit.recipe),
                }
            } else {
                return rejectWithValue('No results found')
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const SearchResultSlice = createSlice({
    name: 'searchResult',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.recipes =action.payload.recipes
                state.nextPageUrl = action.payload.nextPageUrl
                state.loading = false
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                console.log('Searching failed')
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(fetchMoreSearchResults.pending, (state, action) => {
                state.loadingMore = true
                state.error = null
            })
            .addCase(fetchMoreSearchResults.fulfilled, (state, action) => {
                state.recipes = [...state.recipes, ...action.payload.recipes]
                state.nextPageUrl = action.payload.nextPageUrl
                state.loadingMore = false
            })
            .addCase(fetchMoreSearchResults.rejected, (state, action) => {
                console.log('Loading more failed')
                state.loadingMore = false
                state.error = action.payload as string
            })
    },
})

export default SearchResultSlice.reducer;
