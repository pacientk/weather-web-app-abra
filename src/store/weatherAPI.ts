import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsInitial, setIsLoading } from './reducers/appReducer';
import { showErrorModal } from './reducers/modalDialogReducer';

const BASE_URL = 'https://dataservice.accuweather.com';

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
                thunkAPI.dispatch(fetchWeatherByCityKey(cityKey));
                thunkAPI.dispatch(getDailyForecasts(cityKey));
            }

            return response.data;
        } catch (e) {
            thunkAPI.dispatch(showErrorModal({ message: e['message'], title: e['name'] }));
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
            thunkAPI.dispatch(showErrorModal({ message: e['message'], title: e['name'] }));
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
            thunkAPI.dispatch(showErrorModal({ message: e['message'], title: e['name'] }));
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const fetchSearchCitiesData = createAsyncThunk(
    'weather/fetchSearchCitiesData',
    async (cityName: string, thunkAPI) => {
        const axiosCancelSource = axios.CancelToken.source();
        try {
            const response = await axios.get(
                `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cityName}`,
                { cancelToken: axiosCancelSource.token }
            );

            return response.data;
        } catch (e) {
            thunkAPI.dispatch(showErrorModal({ message: e['message'], title: e['name'] }));
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const fetchFavWeatherByCityKey = createAsyncThunk(
    'weather/fetchFavWeatherByCityKey',
    async (favorites: any, thunkAPI) => {
        try {
            return await Promise.all(
                favorites.map(async (city: any) => {
                    const response = await axios.get(
                        `${BASE_URL}/forecasts/v1/hourly/1hour/${city.cityKey}?apikey=${process.env.REACT_APP_WEATHER_API_KEY}`
                    );
                    return { cityKey: city.cityKey, temperValue: response.data[0].Temperature.Value, weatherType: response.data[0].IconPhrase };
                })
            );

            thunkAPI.dispatch(setIsLoading(true));

        } catch (e) {
            thunkAPI.dispatch(showErrorModal({ message: e['message'], title: e['name'] }));
            return thunkAPI.rejectWithValue(e);
        }
    }
);





