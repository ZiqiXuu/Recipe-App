import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import './RecipeCard.css'
import RecipeDialog from "./RecipeDialog";
import {TotalNutrients, digest} from "../../types";
import {addToBookmarks} from "../../store/features/bookmarkSlice";
import {useAppDispatch} from "../../store/store";

interface Props {
    title: string
    imageUrl: string
    calories: number
    healthLabels: string[]
    dietLabels: string[]
    ingredientLines: string[]
    totalNutrients:TotalNutrients
    digest: digest
}

const RecipeCard: React.FC<Props> = (Props) => {
    const {title, imageUrl, calories, healthLabels, dietLabels, ingredientLines, totalNutrients, digest} = Props
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState<boolean>(false)

    const handleAddToBookmarks = () =>{
        dispatch(addToBookmarks(Props))
    }

    return (
        <div>
            <Card className='singleRecipeContainer'>
                <CardActionArea className='singleRecipe' onClick={()=>setOpen(true)}>
                    <h3>{title}</h3>
                    <div className='singleRecipe_details'>
                        <div>
                            <img className='singleRecipe_details_img' src={imageUrl} alt={title}/>
                            <Typography variant="overline" display="block" gutterBottom>
                                {Math.round(calories)} Kcal
                            </Typography>
                        </div>
                        <CardContent className='singleRecipe_details_content'>
                            <Typography variant="body2" color="text.secondary">
                                {dietLabels.join(" • ")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {healthLabels.join(" • ")}
                            </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
            <RecipeDialog
                open={open}
                title={title}
                imageUrl={imageUrl}
                ingredientLines={ingredientLines}
                totalNutrients={totalNutrients}
                digest={digest}
                setOpen={setOpen}
                handleAddToBookmarks={handleAddToBookmarks}
            />
        </div>
    );
};

export default RecipeCard;