import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCityData, fetchFavWeatherByCityKey, fetchSearchCitiesData, fetchWeatherByCityKey, getDailyForecasts } from '../weatherAPI';
import { Forecast, ICurrentCityData, ISearchCitiesData, IWeatherByCityKey } from '../../utils/@types';

// TODO: Error modal

export enum TempUnit {
    CELCIUS,
    FAHRENHEIT,
}

const initialState: ICurrentCityData = {
    currentCityData: {
        name: 'Tel Aviv',
        cityKey: 0,
        weather: {
            value: 0,
            unit: '',
            weatherType: '',
        },
        forecast: []
    },
    suggestionsCities: [],
    favorites: [],
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
        setCurrentCity(state, action) {
            state.currentCityData.name = action.payload;
        },
        cleanSuggestionsCities(state) {
            state.suggestionsCities = [];
        },
        setDegreeType(state, action) {
            state.degreeType = action.payload;
        },
        addToFavorites(state, action) {
            const newFav = action.payload;
            state.favorites = [...state.favorites, newFav];
        },
        removeFromFavorites(state, action) {
            const allFav = state.favorites;
            state.favorites = allFav.filter((e: any) => e.cityKey !== action.payload);
        }
    },
    extraReducers: {
        /**
         * fetchCityData
         * @param state
         * @param action
         */
        [fetchCityData.pending.type]: () => {
            // console.log('@@@@ FETCH CITY DATA pending');
        },
        [fetchCityData.fulfilled.type]: (state, action: PayloadAction<{ [key: string]: any }>) => {
            state.currentCityData.cityKey = action.payload[0].Key;
            state.currentCityData.name = action.payload[0].LocalizedName;
        },
        [fetchCityData.rejected.type]: () => {
            console.log('@@@@ FETCH CITY DATA rejected');
        },

        /**
         * fetchWeatherByCityKey
         * @param state
         * @param action
         */
        [fetchWeatherByCityKey.pending.type]: () => {
            // console.log('@@@@ FETCH WEATHER BY CITY KEY pending',action.payload);
        },
        [fetchWeatherByCityKey.fulfilled.type]: (state, action: PayloadAction<IWeatherByCityKey>) => {
            state.currentCityData.weather.value = action.payload[0].Temperature.Value;
            state.currentCityData.weather.unit = action.payload[0].Temperature.Unit;
            state.currentCityData.weather.weatherType = action.payload[0].IconPhrase;
        },
        [fetchWeatherByCityKey.rejected.type]: () => {
            console.log('@@@@ FETCH WEATHER BY CITY KEY rejected');
        },

        /**
         * getDailyForecasts
         * @param state
         * @param action
         */
        [getDailyForecasts.pending.type]: () => {
            // console.log('@@@@ FETCH WEATHER BY CITY KEY pending');
        },
        [getDailyForecasts.fulfilled.type]: (state, action: PayloadAction<Forecast[]>) => {
            state.currentCityData.forecast = action.payload['DailyForecasts'];
        },
        [getDailyForecasts.rejected.type]: () => {
            console.log('@@@@ FETCH WEATHER BY CITY KEY rejected');
        },

        /**
         * fetchSearchCitiesData
         * @param state
         * @param action
         */
        [fetchSearchCitiesData.pending.type]: () => {
            // console.log('@@@@ fetchSearchCitiesData pending');
        },
        [fetchSearchCitiesData.fulfilled.type]: (state, action: PayloadAction<ISearchCitiesData[]>) => {
            action.payload?.map((city: any) => {
                const newSugg = { ...suggestionTemplate };

                newSugg.cityKey = city.Key;
                newSugg.cityName = city.LocalizedName;
                newSugg.cityCountry = city.Country.LocalizedName;

                state.suggestionsCities = [...state.suggestionsCities, newSugg];
            });
        },
        [fetchSearchCitiesData.rejected.type]: () => {
            console.log('@@@@ fetchSearchCitiesData rejected');
        },

        /**
         * fetchFavWeatherByCityKey
         * @param state
         * @param action
         */
        [fetchFavWeatherByCityKey.pending.type]: () => {
            // console.log('@@@@ fetchFavWeatherByCityKey pending');
        },
        [fetchFavWeatherByCityKey.fulfilled.type]: (state, action: PayloadAction<{ [key: string]: string | number }[]>) => {
            const merged = state.favorites.map((item: any, i) => {
                if (item.cityKey === action.payload[i].cityKey) {
                    return Object.assign({}, item, action.payload[i]);
                }
            });
            state.favorites = merged;
        },
        [fetchFavWeatherByCityKey.rejected.type]: () => {
            console.log('@@@@ fetchFavWeatherByCityKey rejected');
        },
    }
});
export const { setCurrentCity, cleanSuggestionsCities, setDegreeType, addToFavorites, removeFromFavorites } = weatherSlice.actions;
export default weatherSlice.reducer;
