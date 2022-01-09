import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';


const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>

                <Link className="App-link" to="/favorites">favorites</Link>
            </header>
        </div>
    );
};

export default Home;
