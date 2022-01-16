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
export const favoritesSelector = (state: RootState) => state.weatherReducer.favorites;

// Modal
export const isModalShowSelector = (state: RootState) => state.modalDialogReducer.isModalShow;
export const modalTypeSelector = (state: RootState) => state.modalDialogReducer.modalType;
export const modalErrMessageSelector = (state: RootState) => state.modalDialogReducer.modalErrMessage;
export const modalErrTitleSelector = (state: RootState) => state.modalDialogReducer.modalErrTitle;
