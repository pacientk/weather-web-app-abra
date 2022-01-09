import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import { setIsLoading } from '../../store/reducers/appReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { isLoadingSelector } from '../../store/selectors';
import Spinner from '../../components/ui/Spinner/Spinner';


const Home = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);

    useEffect(() => {
        setTimeout(() => dispatch(setIsLoading(true)), 2000);
    }, []);

    return (
        <div className="App">

            {isLoading && <Spinner />}

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
