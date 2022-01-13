import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { degreeTypeSelector, favoritesSelector, isInitialSelector, isLoadingSelector } from '../../store/selectors';
import { TempUnit } from '../../store/reducers/weatherReducer';
import { fahrenheitToCelcius } from '../../utils/utils';
import { fetchCityData, fetchFavWeatherByCityKey } from '../../store/weatherAPI';
import { AddRemoveToFavBtn } from '../../components';
import { Favorite } from '../../utils/@types';


const Favorites = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector(isLoadingSelector);
    const isInitial = useAppSelector(isInitialSelector);
    const degreeType = useAppSelector(degreeTypeSelector);
    const favorites = useAppSelector(favoritesSelector);

    useEffect(() => {
        dispatch(fetchFavWeatherByCityKey(favorites));
    }, []);

    const passToHome = async (cityName: string) => {
        await dispatch(fetchCityData(cityName));
        navigate('/');
    };

    const defineGrid = () => {

        if (favorites?.length) {
            return favorites?.map((city: Favorite, i: number) => {
                return (
                    <div
                        key={city.cityKey}
                        onClick={() => passToHome(city.cityName)}
                        className="list-group-item list-group-item-action border-0" style={{ cursor: 'pointer' }}>

                        <div key={city.cityKey} className="hstack border-bottom pb-2">
                            <div className="mt-4">
                                <p className="fw-lighter fs-2 lh-1 mb-1">{city.cityName}</p>
                                <p className="fw-lighter fs-5 lh-1">{city.weatherType}</p>
                            </div>
                            <div className="ms-auto mt-3">
                                <p className="text-end fw-lighter fs-2 lh-1 mb-1">
                                    {degreeType === TempUnit.CELCIUS ? fahrenheitToCelcius(city.temperValue) : city.temperValue}{'\xB0'}
                                </p>
                                <AddRemoveToFavBtn currentCityData={city} />
                            </div>
                        </div>
                    </div>
                );
            });
        }

        return (<p className="text-center fs-2 fw-lighter">No favorites Cities</p>);
    };

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
                    {defineGrid()}
                </Col>
            </Row>


        </Container>
    );
};

export default Favorites;
