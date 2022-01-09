import React from 'react';
import { Link } from 'react-router-dom';


const Favorites = () => {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    favorites
                </p>
                <nav>
                    <Link className="App-link" to="/">Home</Link>
                </nav>
            </header>
        </div>
    );
};

export default Favorites;
