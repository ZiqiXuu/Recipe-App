import React from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import './RecipeDialog.css'
import {TotalNutrients, digest} from "../../types";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {deleteOneBookmark} from "../../store/features/bookmarkSlice";

interface Props {
    title: string
    imageUrl: string
    ingredientLines: string[]
    totalNutrients: TotalNutrients
    digest: digest
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleAddToBookmarks: () => void
}

const RecipeDialog: React.FC<Props> = (Props) => {
    const dispatch = useAppDispatch()
    const {title, imageUrl, ingredientLines, totalNutrients, digest, open, setOpen, handleAddToBookmarks} = Props
    const bookmarkedItems = useAppSelector(state => state.bookmark.items)
    const bookmarked = bookmarkedItems.some(item => item.title === title)
    const handleBookmarkBtnClick = () => {
        bookmarked ? dispatch(deleteOneBookmark(title)) : handleAddToBookmarks()
    }
    const Ingredient = () => {
        return (
            <>
                <h4>Ingredient</h4>
                {ingredientLines.map((ingredient, index) => (
                    <DialogContentText key={index}>
                        • {ingredient}
                    </DialogContentText>
                ))}
            </>
        )
    }

    const Nutrients = () => {
        return (
            <>
                <h4>Nutrients</h4>
                {Object.entries(totalNutrients).map(([key, nutrient]) => {
                    return (
                        Math.round(nutrient.quantity) > 0 && <DialogContentText key={key}>
                            {nutrient.label}: {Math.round(nutrient.quantity)} {nutrient.unit}
                        </DialogContentText>
                    )
                })}
            </>
        )
    }
    const Digest = () => {
        return (
            <>
                <h4>Digest</h4>
                {digest.map((digest, index) => {
                    return (
                        Math.round(digest.total) > 0 && <DialogContentText key={index}>
                            {digest.label}: {Math.round(digest.total)} {digest.unit}
                        </DialogContentText>
                    )
                })}
            </>
        )
    }

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className='recipe'>{title}</DialogTitle>
            <img className='recipeImg' src={imageUrl} alt={title}/>
            <DialogContent>
                {Ingredient()}
                {Nutrients()}
                {Digest()}
            </DialogContent>
            <DialogActions className='dialogActions'>
                <Box>
                    <IconButton aria-label="add to favorites" onClick={handleBookmarkBtnClick}>
                        {bookmarked ? <BookmarkOutlinedIcon/> : <BookmarkAddOutlinedIcon/>}
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon/>
                    </IconButton>
                </Box>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RecipeDialog;