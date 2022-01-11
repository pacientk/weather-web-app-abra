import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from './store/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Favorites, Home } from './screens';
import { Provider } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar';

const store = setupStore()

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
