import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCityData, fetchWeatherByCityKey, getDailyForecasts } from '../weatherAPI';

export interface IWeatherState {
    // weatherData: any;
    // isError: boolean;
    // currentCityWeatherData: any;
    currentCityData: any;
}

const initialState: IWeatherState = {
    // weatherData: {},
    // isError: false,
    // currentCityWeatherData: [],
    currentCityData: {
        name: 'Tel Aviv',
        cityKey: 0,
        weather: {
            value: '-',
            unit: '',
            weatherType: '',
        },
        forecast: []
    }
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: {
        // [fetchWeatherByKey.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
        //     // state.currentCityWeatherData = action.payload;
        // },
        // [fetchWeatherByKey.rejected.type]: (state, action: PayloadAction<string>) => {
        //     state.isError = true;
        // },
        /**
         * fetchCityData
         * @param state
         * @param action
         */
        [fetchCityData.pending.type]: (state, action: PayloadAction<string[]>) => {
            // console.log('@@@@ FETCH CITY DATA pending');
        },
        [fetchCityData.fulfilled.type]: (state, action: PayloadAction<{ [key: string]: any }>) => {
            state.currentCityData.cityKey = action.payload[0].Key;
            state.currentCityData.name = action.payload[0].LocalizedName;
        },
        [fetchCityData.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('@@@@ FETCH CITY DATA rejected');
        },

        /**
         * fetchWeatherByCityKey
         * @param state
         * @param action
         */
        [fetchWeatherByCityKey.pending.type]: (state, action: PayloadAction<string[]>) => {
            // console.log('@@@@ FETCH WEATHER BY CITY KEY pending',action.payload);
        },
        [fetchWeatherByCityKey.fulfilled.type]: (state, action: PayloadAction<{ [key: string]: any }>) => {
            state.currentCityData.weather.value = action.payload[0].Temperature.Value;
            state.currentCityData.weather.unit = action.payload[0].Temperature.Unit;
            state.currentCityData.weather.weatherType = action.payload[0].IconPhrase;
        },
        [fetchWeatherByCityKey.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('@@@@ FETCH WEATHER BY CITY KEY rejected');
        },

        /**
         * getDailyForecasts
         * @param state
         * @param action
         */
        [getDailyForecasts.pending.type]: (state, action: PayloadAction<string[]>) => {
            // console.log('@@@@ FETCH WEATHER BY CITY KEY pending');
        },
        [getDailyForecasts.fulfilled.type]: (state, action: PayloadAction<{ [key: string]: string | number }>) => {
            state.currentCityData.forecast = action.payload['DailyForecasts']
        },
        [getDailyForecasts.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('@@@@ FETCH WEATHER BY CITY KEY rejected');
        },
    }
});

export default weatherSlice.reducer;
