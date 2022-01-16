import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from './store/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Favorites, Home } from './screens';
import { Provider } from 'react-redux';
import { ModalDialog, NavBar } from './components';

const store = setupStore();

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                </Routes>
                <div>
                    <p className="fw-lighter text-center mt-4" style={{ fontSize: '0.75rem' }}>Developed By Kir Ter</p>
                </div>
                <ModalDialog />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
