import { createSlice } from '@reduxjs/toolkit';

export interface IWeatherState {
    weatherData: any;
    isError: boolean;
}

const initialState: IWeatherState = {
    weatherData: {},
    isError: false,
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: {}
});

export default weatherSlice.reducer;
