import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { favoritesSelector } from '../../store/selectors';
import { addToFavorites, removeFromFavorites } from '../../store/reducers/weatherReducer';


const AddRemoveToFavBtn = (props: { cityKey: number }) => {
    const cityKey = props.cityKey
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(favoritesSelector);

    const addToFav = (id: number) => {
        dispatch(addToFavorites(id));
    };

    const removeFromFav = (id: number) => {
        dispatch(removeFromFavorites(id));
    };

    // @ts-ignore
    if (!favorites.includes(cityKey)) {
        return (
            <button
                onClick={() => addToFav(cityKey)}
                type="button"
                className="btn btn-sm btn-light text-center">
                Add to Favorites
            </button>
        );
    } else {
        return (
            <button
                onClick={() => removeFromFav(cityKey)}
                type="button"
                className="btn btn-sm btn-light text-center">
                Remove
            </button>
        );
    }
};

export default AddRemoveToFavBtn;
