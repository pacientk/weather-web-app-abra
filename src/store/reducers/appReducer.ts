import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
    isLoading: boolean;
}

const initialState: IAppState = {
    isLoading: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state: IAppState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = appSlice.actions;
export default appSlice.reducer;
