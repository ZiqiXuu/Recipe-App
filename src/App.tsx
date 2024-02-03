import React from 'react';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import {BrowserRouter} from "react-router-dom";
import SearchResultPage from "./components/SearchRsultPage/SearchResultPage";
import BookmarkPage from "./components/BookmarkPage/BookmarkPage";
import { Route, Routes } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <SearchBar/>
                <Routes>
                    <Route path="/" element={<SearchResultPage />}/>
                    <Route path="/bookmarks" element={<BookmarkPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
