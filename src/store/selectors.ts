import { RootState } from "./store";

// App
export const stateSelector = (state: RootState) => state;
export const isLoadingSelector = (state: RootState) => state.appReducer.isLoading;
export const isInitialSelector = (state: RootState) => state.appReducer.isInitial;

// Weather
export const currentCityWeatherDataSelector = (state: RootState) => state.weatherReducer.currentCityWeatherData;
