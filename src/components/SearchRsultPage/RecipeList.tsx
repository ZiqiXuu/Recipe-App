import React from 'react';
import RecipeCard from "./RecipeCard";
import './RecipeList.css'
import {useAppDispatch, useAppSelector} from "../../store/store";
import Button from "@mui/material/Button";
import {fetchMoreSearchResults} from "../../store/features/searchResultSlice";
import CircularProgress from '@mui/material/CircularProgress';

const RecipeList: React.FC = () => {
    const dispatch = useAppDispatch()
    const {recipes, nextPageUrl, loadingMore, error} = useAppSelector((state) => state.searchResult)

    return (
        <div>
            {error ||
                <>
                    <div className='recipeList'>
                        {
                            recipes.map((recipe, index) => {
                                return (
                                    <RecipeCard
                                        title={recipe.label}
                                        imageUrl={recipe.images.SMALL.url}
                                        calories={recipe.calories}
                                        dietLabels={recipe.dietLabels}
                                        healthLabels={recipe.healthLabels}
                                        ingredientLines={recipe.ingredientLines}
                                        totalNutrients={recipe.totalNutrients}
                                        digest={recipe.digest}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                    {nextPageUrl &&
                        <Button className='nextPageBtn' onClick={() => dispatch(fetchMoreSearchResults(nextPageUrl))}>
                            {loadingMore ? <CircularProgress/> : 'Load More'}
                        </Button>
                    }
                </>
            }
        </div>
    );
};

export default RecipeList;