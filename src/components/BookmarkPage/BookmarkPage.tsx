import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store";
import RecipeCard from "../SearchRsultPage/RecipeCard";
import './BookmarkPage.css'
import Button from '@mui/material/Button';
import {deleteOneBookmark} from "../../store/features/bookmarkSlice";
import Typography from '@mui/material/Typography';


const BookmarkPage = () => {
    const dispatch = useAppDispatch()
    const bookmarkedItems = useAppSelector(state => state.bookmark.items)

    return (
        <>
            {bookmarkedItems.length?
            <div className='recipeList'>
                {bookmarkedItems.map((item, index) => (
                    <div key={index}>
                        <RecipeCard
                            title={item.title}
                            imageUrl={item.imageUrl}
                            calories={item.calories}
                            healthLabels={item.healthLabels}
                            dietLabels={item.dietLabels}
                            ingredientLines={item.ingredientLines}
                            totalNutrients={item.totalNutrients}
                            digest={item.digest}
                        />
                        <Button aria-label="delete" onClick={() => dispatch(deleteOneBookmark(item.title))}>
                            Delete
                        </Button>
                    </div>
                ))}
            </div> :
                <Typography variant="overline" display="block" gutterBottom>
                    No result in bookmarks
                </Typography>}
        </>
    );
};

export default BookmarkPage;