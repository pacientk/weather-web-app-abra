import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCityData } from '../../store/weatherAPI';
import { currentCityDataSelector, isLoadingSelector, isInitialSelector, currentDaylyForecastSelector, degreeTypeSelector } from '../../store/selectors';
import Spinner from '../../components/Spinner/Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import { fahrenheitToCelcius, getWeekDay } from '../../utils/utils';
import { SearchInput } from '../../components';
import { TempUnit } from '../../store/reducers/weatherReducer';
import AddRemoveToFavBtn from '../../components/AddRemoveToFavBtn';
import { Forecast } from '../../utils/@types';

const Home = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const isInitial = useAppSelector(isInitialSelector);
    const currentCityData = useAppSelector(currentCityDataSelector);
    const currentDaylyForecast = useAppSelector(currentDaylyForecastSelector);
    const degreeType = useAppSelector(degreeTypeSelector);

    useEffect(() => {
        dispatch(fetchCityData(currentCityData.name));
    }, []);

    const forecastItem = () => {
        return (
            currentDaylyForecast.map((item: Forecast, i: number) => {
                const { Maximum, Minimum } = item.Temperature;
                const weatherType = item.Day.IconPhrase;
                const date = item.Date;
                // @ts-ignore
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
                            <AddRemoveToFavBtn currentCityData={currentCityData} />
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
