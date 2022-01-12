import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { favoritesSelector } from '../../store/selectors';
import { addToFavorites, removeFromFavorites } from '../../store/reducers/weatherReducer';


const AddRemoveToFavBtn = (props: { currentCityData: any }) => {
    const currentCityData = props.currentCityData;
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(favoritesSelector);

    const addToFav = () => {
        dispatch(addToFavorites({ cityKey: currentCityData.cityKey, cityName: currentCityData.name }));
    };

    const removeFromFav = () => {
        dispatch(removeFromFavorites(currentCityData.cityKey));
    };


    if (favorites.filter((e: any) => e.cityKey === currentCityData.cityKey).length > 0) {
        return (
            <button
                onClick={() => removeFromFav()}
                type="button"
                className="btn btn-sm btn-light text-center fw-light">
                Remove from Favorites
            </button>

        );
    } else {
        return (
            <button
                onClick={() => addToFav()}
                type="button"
                className="btn btn-sm btn-light text-center fw-light">
                Add to Favorites
            </button>
        );
    }
};

export default AddRemoveToFavBtn;
