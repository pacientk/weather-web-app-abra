import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

const BASE_URL = 'http://dataservice.accuweather.com';

export const fetchWeatherByKey = createAsyncThunk(
    'weather/fetchWeatherByKey',
    async (data: number, thunkAPI) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/forecasts/v1/hourly/1hour/${data}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
            );

            thunkAPI.dispatch(setIsLoading(true));

            if (response.status === 200) {
                thunkAPI.dispatch(setIsInitial(true));
                thunkAPI.dispatch(setIsLoading(false));
            }

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const fetchCityData = createAsyncThunk(
    'weather/fetchCityData',
    async (cityName: string, thunkAPI) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/locations/v1/cities/search?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cityName}`
            );

            console.log('@@@@ response', response.data[0].Key);
            console.log('@@@@ LocalizedName', response.data[0].LocalizedName);

            if (response.status === 200) {
                thunkAPI.dispatch(fetchWeatherByKey(response.data[0].Key));
            }

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);


