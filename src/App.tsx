import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Favorites, Home } from './screens';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;