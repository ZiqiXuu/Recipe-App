import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {BookmarkSlice} from "./features/bookmarkSlice";
import searchResultReducer from "./features/searchResultSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from "@reduxjs/toolkit";

const persistConfig= {
    key: 'root',
    version: 1,
    storage
}
const persistedBookmarkReducer = persistReducer(persistConfig, BookmarkSlice.reducer);

const reducer = combineReducers({
    bookmark: persistedBookmarkReducer,
    searchResult: searchResultReducer
})

export const store = configureStore({
    reducer: reducer
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;