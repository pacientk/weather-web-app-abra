import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCityData, fetchWeatherByKey } from '../weatherAPI';

export interface IWeatherState {
    weatherData: any;
    isError: boolean;
    currentCityWeatherData: any;
    currentCityData: any;
}

const initialState: IWeatherState = {
    weatherData: {},
    isError: false,
    currentCityWeatherData: [],
    currentCityData: {}
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchWeatherByKey.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            state.currentCityWeatherData = action.payload;
        },
        [fetchWeatherByKey.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isError = true;
        },

        [fetchCityData.pending.type]: (state, action: PayloadAction<string[]>) => {
            console.log('@@@@ fetchCityData.pending');
        },
        [fetchCityData.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            console.log('@@@@ fetchCityData.fulfilled', action.payload[0]);
            state.currentCityData = action.payload[0]
        },
        [fetchCityData.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('@@@@ fetchCityData.rejected');
        },
    }
});

export default weatherSlice.reducer;
