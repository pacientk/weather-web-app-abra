import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from './store/store';
import './App.css';
import { Favorites, Home } from './screens';
import { Provider } from 'react-redux';

const store = setupStore()

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
