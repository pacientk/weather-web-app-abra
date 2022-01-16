import React from 'react';
import { Modal } from 'react-bootstrap';
import { isModalShowSelector, modalErrMessageSelector, modalErrTitleSelector, modalTypeSelector } from '../../store/selectors';
import { resetModalDialog } from '../../store/reducers/modalDialogReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

enum DialogTypes {
    ERROR,
}

const ModalDialog = () => {
    const dispatch = useAppDispatch();
    const isModalShow = useAppSelector(isModalShowSelector);
    const modalType = useAppSelector(modalTypeSelector);
    const modalErrMessage = useAppSelector(modalErrMessageSelector);
    const modalErrTitle = useAppSelector(modalErrTitleSelector);

    const getDialogByType = () => {
        switch (modalType) {
            case DialogTypes[DialogTypes.ERROR]:
                return errorDialog();
            default:
                return null;
        }
    };

    const errorDialog = () => {
        return (
            <>
                <Modal.Body>
                    <h3 className="mt-3 mb-4 text-secondary">{modalErrTitle.length > 0 && modalErrTitle || 'Error'}</h3>
                    <p>
                        {modalErrMessage.length > 0 && modalErrMessage || 'Network Error'}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-secondary" onClick={() => window.location.reload()}>Reload page</button>
                </Modal.Footer>
            </>
        );
    };

    const handleClose = () => {
        dispatch(resetModalDialog());
    };

    return (
        <Modal
            show={isModalShow}
            onHide={handleClose}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            {getDialogByType()}
        </Modal>
    );
};

export default ModalDialog;
