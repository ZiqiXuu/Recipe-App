import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import RecipeList from "./RecipeList";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const SearchResultPage = () => {
    const {loading} = useSelector((state: RootState) => state.searchResult)
    const Loading = () =>(
        <Box sx={{ display: 'flex',mt:'100px'}}>
            <CircularProgress />
        </Box>
    )

    return (
        <div className='recipeList'>
            {loading ?
                Loading()
                : <RecipeList/>}
        </div>
    );
};

export default SearchResultPage;