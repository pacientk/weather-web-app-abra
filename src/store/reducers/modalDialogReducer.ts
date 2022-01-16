import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
    isModalShow: boolean,
    modalErrMessage: string,
    modalErrTitle: string,
    modalType: string,
}

const initialState: IAppState = {
    isModalShow: false,
    modalErrTitle: '',
    modalErrMessage: '',
    modalType: 'ERROR',
};

const modalDialogSlice = createSlice({
    name: 'modalDialog',
    initialState,
    reducers: {
        resetModalDialog: () => initialState,

        showErrorModal(state, action: PayloadAction<{ [key: string]: string }>) {
            state.isModalShow = true;
            state.modalErrTitle = action.payload.title;
            state.modalErrMessage = action.payload.message;
        },
    }
});

export const { showErrorModal, resetModalDialog } = modalDialogSlice.actions;
export default modalDialogSlice.reducer;
