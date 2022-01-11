import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { currentCityWeatherDataSelector, isLoadingSelector, isInitialSelector } from '../../store/selectors';
import Spinner from '../../components/ui/Spinner/Spinner';
import { Button, Container, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { fetchCityData, fetchWeatherByKey } from '../../store/weatherAPI';
import { CityEnum } from '../../utils/constants';
import { fahrenheitToCelcius } from '../../utils/utils';
import { NavBar } from '../../components';


const Home = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const isInitial = useAppSelector(isInitialSelector);
    const currentWeatherCity = useAppSelector(currentCityWeatherDataSelector);

    useEffect(() => {
        // dispatch(fetchWeatherByKey(CityEnum['Tel Aviv']));
        dispatch(fetchCityData('Tel Aviv'));
    }, []);


    return (
        <Container>
            {isLoading && !isInitial && <Spinner />}

            <Row>
                <Col md={{ span: 9, offset: 1 }}>

                    <InputGroup className="mb-3 mt-3" size="lg">
                        <FormControl
                            placeholder="Search for Location"
                            aria-label="Search for Location"
                            aria-describedby="city-search"
                        />
                        <Button variant="outline-secondary" id="city-search">
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            {isInitial && currentWeatherCity.length &&
            <Row>
                <Col md={{ span: 9, offset: 1 }} style={{borderStyle: 'solid'}}>
                    <div>
                        <p className="text-center fw-lighter display-1" >{fahrenheitToCelcius(currentWeatherCity[0]?.Temperature?.Value)}</p>
                    </div>

                    <div>{JSON.stringify(currentWeatherCity)}</div>
                </Col>
            </Row>
            }
        </Container>
    );
};

export default Home;
