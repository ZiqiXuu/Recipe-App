import React from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";
import './AutocompleteFilter.css';
import {AutocompleteConfig, AutocompleteValues} from "../../types";

interface Props {
    setAdvancedFilters: React.Dispatch<React.SetStateAction<AutocompleteValues | null>>
}

const AutocompleteFilter: React.FC<Props> = (props) => {
    const {setAdvancedFilters} = props
    const [autocompleteValues, setAutocompleteValues] = useState<AutocompleteValues>({})
    const filterOptions: AutocompleteConfig[] = [
        {label: 'diet', options: ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium']},
        {label: 'health', options: ['alcohol-cocktail', 'alcohol-free', 'celery-free', 'crustacean-free', 'dairy-free', 'DASH', 'egg-free', 'fish-free', 'fodmap-free', 'gluten-free', 'immuno-supportive', 'keto-friendly', 'kidney-friendly', 'kosher', 'low-fat-abs', 'low-potassium', 'low-sugar', 'lupine-free', 'Mediterranean', 'mollusk-free', 'mustard-free', 'no-oil-added', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious', 'sulfite-free', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free']},
        {label: 'cuisineType', options: ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']},
        {label: 'mealType', options: ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime']},
        {label: 'dishType', options: ['Biscuits and cookies', 'Bread', 'Cereals', 'Condiments and sauces', 'Desserts', 'Drinks', 'Main course', 'Pancake', 'Preps', 'Preserve', 'Salad', 'Sandwiches', 'Side dish', 'Soup', 'Starter', 'Sweets']},
    ]

    const handleFilterOptionsChange = (type: string) => (event: React.ChangeEvent<{}>, newValue: string | null) => {
        setAutocompleteValues({...autocompleteValues, [type]: newValue})
    }

    const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const caloriesValue = event.target.value === '' ? null : event.target.value
        setAutocompleteValues({...autocompleteValues, 'calories': caloriesValue})
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setAdvancedFilters(autocompleteValues)
        console.log(autocompleteValues)
    }

    const handleClearAll = () => {
        setAutocompleteValues({})
        setAdvancedFilters({})
    }

    const FilterOption = () => {
        return (
            <>
                {filterOptions.map((config, index) => {
                    return (
                        <Autocomplete
                            className='filter_option'
                            key={index}
                            value={autocompleteValues[config.label] || null}
                            onChange={handleFilterOptionsChange(config.label)}
                            options={config.options}
                            renderInput={(params) => (
                                <TextField {...params} label={config.label}/>
                            )}
                        />
                    )
                })}
            </>
        )
    }

    return (
        <form onSubmit={handleSave}>
            <div className='filter'>
                {FilterOption()}
                <TextField value={autocompleteValues.calories || ''} className='filter_option' label="Calories" onChange={handleCaloriesChange}/>
            </div>
            <div className='submitBtnGroup'>
                <Button sx={{m:'0 10px'}} variant="contained" onClick={handleClearAll}>Reset</Button>
                <Button sx={{m:'0 10px'}} type="submit" variant="contained">Save</Button>
            </div>
        </form>
    );
};

export default AutocompleteFilter;