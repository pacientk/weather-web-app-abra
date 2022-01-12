import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCityData } from '../../store/weatherAPI';
import { currentCityDataSelector, isLoadingSelector, isInitialSelector, initStateSelector, currentDaylyForecastSelector, degreeTypeSelector, favoritesSelector } from '../../store/selectors';
import Spinner from '../../components/Spinner/Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import { fahrenheitToCelcius, getWeekDay } from '../../utils/utils';
import { SearchInput } from '../../components';
import { addToFavorites, removeFromFavorites, TempUnit } from '../../store/reducers/weatherReducer';
import AddRemoveToFavBtn from '../../components/AddRemoveToFavBtn';

const DEFAULT_CITY = 'Tel Aviv';

const Home = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const isInitial = useAppSelector(isInitialSelector);
    const currentCityData = useAppSelector(currentCityDataSelector);
    const currentDaylyForecast = useAppSelector(currentDaylyForecastSelector);
    const degreeType = useAppSelector(degreeTypeSelector);
    const favorites = useAppSelector(favoritesSelector);

    useEffect(() => {
        dispatch(fetchCityData(DEFAULT_CITY));
    }, []);

    const addToFav = (cityKey: number) => {
        dispatch(addToFavorites(cityKey));
    };

    const removeFromFav = (cityKey: number) => {
        dispatch(removeFromFavorites(cityKey));
    };

    const forecastItem = () => {
        return (
            currentDaylyForecast.map((item: any, i: number) => {
                const { Maximum, Minimum } = item.Temperature;
                const weatherType = item.Day.IconPhrase;
                const date = item.Date;
                const weekDay = getWeekDay(date);

                return (
                    <Col key={i} className="mt-5 mb-5">
                        <p className="text-center fw-lighter fs-3 lh-1">{weekDay}</p>
                        <p className="text-center fw-lighter fs-5 lh-1">{weatherType}</p>
                        <p className="text-center fw-lighter fs-2 lh-1">
                            {degreeType === TempUnit.CELCIUS ? fahrenheitToCelcius(Maximum.Value) : Maximum.Value}{'\xB0'}
                            {'\u00A0'}/{'\u00A0'}
                            {degreeType === TempUnit.CELCIUS ? fahrenheitToCelcius(Minimum.Value) : Minimum.Value}{'\xB0'}
                        </p>
                    </Col>
                );
            })
        );
    };

    // STATE
    console.log('@@@@ STATE', useAppSelector(initStateSelector));

    return (
        <Container>
            {isLoading && !isInitial && <Spinner />}

            <Row>
                <Col md={{ span: 10, offset: 1 }} style={{ paddingTop: '2rem' }}>
                    <SearchInput />
                </Col>
            </Row>

            {isInitial &&
            <>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="border-bottom mt-5">
                        <div className="mb-5" style={{ textAlign: 'center' }}>
                            <p className="text-center fw-lighter display-5 lh-1">{currentCityData.name}</p>
                            <p className="text-center fw-lighter fs-5 lh-1">{currentCityData.weather.weatherType}</p>
                            <p className="text-center fw-lighter display-1 lh-1">
                                {degreeType === TempUnit.CELCIUS ? fahrenheitToCelcius(currentCityData.weather.value) : currentCityData.weather.value}{'\xB0'}
                            </p>
                            <AddRemoveToFavBtn cityKey={currentCityData.cityKey} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    {forecastItem()}
                </Row>
            </>
            }
        </Container>
    );
};

export default Home;
