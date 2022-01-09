import { RootState } from "./store";


export const stateSelector = (state: RootState) => state;
export const isLoadingSelector = (state: RootState) => state.appReducer.isLoading;
