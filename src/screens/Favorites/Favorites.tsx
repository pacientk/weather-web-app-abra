import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { favoritesSelector, isInitialSelector, isLoadingSelector } from '../../store/selectors';
import { TempUnit } from '../../store/reducers/weatherReducer';
import { fahrenheitToCelcius } from '../../utils/utils';
import { fetchFavWeatherByCityKey } from '../../store/weatherAPI';


const Favorites = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const isInitial = useAppSelector(isInitialSelector);
    const favorites = useAppSelector(favoritesSelector);

    useEffect(() => {
        dispatch(fetchFavWeatherByCityKey(favorites));
    }, []);


    return (
        <Container>
            {isLoading && !isInitial && <Spinner />}

            <Row>
                <Col md={{ span: 10, offset: 1 }} className="pt-4">
                    <p className="fw-lighter fs-2 lh-1">Favorites Cities</p>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 10, offset: 1 }} className=" mt-5">
                    {favorites.map(() => {
                        return (
                            <div className="hstack border-bottom pb-2">
                                <div className="mt-4">
                                    <p className="fw-lighter fs-2 lh-1 mb-1">{'Ashdod'}</p>
                                    <p className="fw-lighter fs-5 lh-1">{'weatherType'}</p>
                                </div>
                                <div className="ms-auto mt-3">
                                    <p className="text-end fw-lighter fs-2 lh-1 mb-1">
                                        555{'\xB0'}
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-lighter text-center lh-1 fw-light">
                                        Add to Favorites
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                </Col>
            </Row>


        </Container>
    );
};

export default Favorites;
