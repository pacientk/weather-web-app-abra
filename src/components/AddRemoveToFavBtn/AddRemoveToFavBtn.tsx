import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { favoritesSelector } from '../../store/selectors';
import { addToFavorites, removeFromFavorites } from '../../store/reducers/weatherReducer';
import { CurrentCityData, Favorite } from '../../utils/@types';


const AddRemoveToFavBtn = (props: { currentCityData: CurrentCityData | any }) => {
    const currentCityData = props.currentCityData;
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(favoritesSelector);

    const addToFav = () => {
        dispatch(addToFavorites({ cityKey: currentCityData.cityKey, cityName: currentCityData.name }));
    };

    const removeFromFav = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.stopPropagation();
        dispatch(removeFromFavorites(currentCityData.cityKey));
    };

    if (favorites.filter((e: Favorite) => e.cityKey === currentCityData.cityKey).length > 0) {
        return (
            <button
                onClick={(e) => removeFromFav(e)}
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
