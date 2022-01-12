import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCityData, fetchSearchCitiesData, fetchWeatherByCityKey, getDailyForecasts } from '../weatherAPI';

export interface IWeatherState {
    currentCityData: any;
    suggestionsCities: any;
    degreeType: number;
}

export enum TempUnit {
    CELCIUS,
    FAHRENHEIT,
}

const initialState: IWeatherState = {
    currentCityData: {
        name: '',
        cityKey: 0,
        weather: {
            value: '-',
            unit: '',
            weatherType: '',
        },
        forecast: []
    },
    suggestionsCities: [],
    degreeType: TempUnit.CELCIUS
};

const suggestionTemplate = {
    cityKey: 0,
    cityName: '',
    cityCountry: ''
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        cleanSuggestionsCities(state) {
            state.suggestionsCities = [];
        },
        setDegreeType(state, action) {
            state.degreeType = action.payload;
        }
    },
    extraReducers: {
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
            state.currentCityData.forecast = action.payload['DailyForecasts'];
        },
        [getDailyForecasts.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('@@@@ FETCH WEATHER BY CITY KEY rejected');
        },

        /**
         * fetchSearchCitiesData
         * @param state
         * @param action
         */
        [fetchSearchCitiesData.pending.type]: (state, action: PayloadAction<string[]>) => {
            // console.log('@@@@ fetchSearchCitiesData pending');
        },
        [fetchSearchCitiesData.fulfilled.type]: (state, action: PayloadAction<any>) => {
            const cities = action.payload.map((city: any, i: number) => {
                const newSugg = { ...suggestionTemplate };

                newSugg.cityKey = city.Key;
                newSugg.cityName = city.LocalizedName;
                newSugg.cityCountry = city.Country.LocalizedName;

                state.suggestionsCities = [...state.suggestionsCities, newSugg];
            });
        },
        [fetchSearchCitiesData.rejected.type]: (state, action: PayloadAction<string>) => {
            console.log('@@@@ fetchSearchCitiesData rejected');
        },
    }
});
export const { cleanSuggestionsCities, setDegreeType } = weatherSlice.actions;
export default weatherSlice.reducer;
