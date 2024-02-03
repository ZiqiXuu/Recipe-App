import {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {TotalNutrients, digest} from "../../types";

interface BookmarkedRecipe {
    title: string
    imageUrl: string
    calories: number
    healthLabels: string[]
    dietLabels: string[]
    ingredientLines: string[]
    totalNutrients: TotalNutrients
    digest: digest
}

interface BookmarkState {
    items: BookmarkedRecipe[]
}

const initialState: BookmarkState = {
    items: []
}

export const BookmarkSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        addToBookmarks: (state, action: PayloadAction<BookmarkedRecipe>) => {
            state.items = [...state.items, action.payload]
        },
        deleteOneBookmark(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.title !== action.payload)
        },
    },
})

export const {addToBookmarks,deleteOneBookmark} = BookmarkSlice.actions;
