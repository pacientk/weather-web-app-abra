import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

const BASE_URL = 'http://dataservice.accuweather.com';

export const fetchCityData = createAsyncThunk(
    'weather/fetchCityData',
    async (cityName: string, thunkAPI) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/locations/v1/cities/search?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cityName}`
            );

            const cityKey = response.data[0].Key;

            thunkAPI.dispatch(setIsLoading(true));

            if (response.status === 200) {
                await thunkAPI.dispatch(fetchWeatherByCityKey(cityKey));
                await thunkAPI.dispatch(getDailyForecasts(cityKey));
            }

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const fetchWeatherByCityKey = createAsyncThunk(
    'weather/fetchWeatherByKey',
    async (cityKey: number, thunkAPI) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/forecasts/v1/hourly/1hour/${cityKey}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
            );

            thunkAPI.dispatch(setIsLoading(true));

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getDailyForecasts = createAsyncThunk(
    'weather/getDailyForecasts',
    async (cityKey: number, thunkAPI) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/forecasts/v1/daily/5day/${cityKey}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
            );

            if (response.status === 200) {
                thunkAPI.dispatch(setIsInitial(true));
                thunkAPI.dispatch(setIsLoading(false));
            }

            thunkAPI.dispatch(setIsLoading(true));

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const fetchSearchCitiesData = createAsyncThunk(
    'weather/fetchSearchCitiesData',
    async (cityName: string, thunkAPI) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/locations/v1/cities/search?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cityName}`
            );

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);




