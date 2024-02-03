import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Typography} from "@mui/material";
import AutocompleteFilter from "./AutocompleteFilter";
import './SearchBar.css'
import MenuButton from "./MenuButton";
import {useAppDispatch} from "../../store/store";
import {fetchSearchResults} from "../../store/features/searchResultSlice";
import {AutocompleteValues} from "../../types";
import { useLocation, useNavigate } from 'react-router-dom';


const SearchBar: React.FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [searchKey, setSearchKey] = useState<string | null>('')
    const [filterExpanded, setFilterExpanded] = useState(false)
    const [advancedFilters, setAdvancedFilters] = React.useState<AutocompleteValues | null>(null)
    const isSearchPage = location.pathname === '/'
    const searchProps={
        searchKey: searchKey,
        advancedFilters: advancedFilters
    }
    const handleSearchKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value)
    }

    const handleSearch = () =>{
        if(searchProps.searchKey || searchProps.advancedFilters){
            dispatch(fetchSearchResults(searchProps))
        }else {
            console.log('Missing Required fields')
        }
    }
    return (
        <div>
            <div className='searchBar'>
                <MenuButton/>
                <SearchIcon className='searchBar_icon'/>
                <TextField id="input-with-sx" label="Search..." variant="standard" onChange={handleSearchKeyChange}/>
                {isSearchPage? <Button onClick={handleSearch} variant="text">Search</Button>:
                    <Button onClick={()=>navigate('/')}>Back to search</Button>}
            </div>
            {isSearchPage &&
            <div className='advancedSearch'>
                <Button className='advancedSearch_Btn' variant="text" onClick={() => setFilterExpanded(!filterExpanded)}>
                    <Typography>Advanced Searching Options</Typography>
                    {filterExpanded ? <KeyboardArrowDownIcon/> : <KeyboardArrowLeftIcon/>}
                </Button>
                <div className={`advancedSearch_filter ${filterExpanded ? 'visible' : ''}`}>
                    <AutocompleteFilter setAdvancedFilters={setAdvancedFilters}/>
                </div>
            </div>}
        </div>
    );
};

export default SearchBar;