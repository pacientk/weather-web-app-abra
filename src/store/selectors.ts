import { RootState } from "./store";

export const initStateSelector = (state: RootState) => state;


// App
export const stateSelector = (state: RootState) => state;
export const isLoadingSelector = (state: RootState) => state.appReducer.isLoading;
export const isInitialSelector = (state: RootState) => state.appReducer.isInitial;

// Weather
export const currentCityDataSelector = (state: RootState) => state.weatherReducer.currentCityData;
export const currentDaylyForecastSelector = (state: RootState) => state.weatherReducer.currentCityData.forecast;
export const suggestionsCitiesSelector = (state: RootState) => state.weatherReducer.suggestionsCities;
export const degreeTypeSelector = (state: RootState) => state.weatherReducer.degreeType;
