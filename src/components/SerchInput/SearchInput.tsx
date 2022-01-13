import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { Col } from 'react-bootstrap';
import { fetchCityData, fetchSearchCitiesData } from '../../store/weatherAPI';
import { suggestionsCitiesSelector } from '../../store/selectors';
import { useAppSelector } from '../../hooks/redux';
import { cleanSuggestionsCities } from '../../store/reducers/weatherReducer';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const suggestionRef = useRef(null);
    const suggestionsCities = useAppSelector(suggestionsCitiesSelector);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!searchTerm) {
            return;
        }
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    const useClickOutside = (element: React.MutableRefObject<any>, callback: Function) => {
        useEffect(() => {
            const handleClickOutside = (event: Event) => {
                if (element.current && !element.current.contains(event.target as any)) {
                    callback();
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        });
    };

    useClickOutside(suggestionRef, () => dispatch(cleanSuggestionsCities()));

    const handleKeyPress = async (e: any) => {
        if (e.charCode === 13 || e.key === 'Enter') {
            e.preventDefault();
            dispatch(cleanSuggestionsCities());
            dispatch(fetchSearchCitiesData(e.target.value));
        }
    };

    const debouncedSearch = debounce(async (cityName) => {
        if (cityName.length > 2) {
            dispatch(cleanSuggestionsCities());
            dispatch(fetchSearchCitiesData(cityName));
        }
    }, 600);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }

    const handleChooseCity = (cityName: string) => {
        dispatch(fetchCityData(cityName));
        dispatch(cleanSuggestionsCities());
        setSearchTerm('');
    };

    return (
        <Col>
            <input
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={searchTerm}
                type="text"
                placeholder="City Search"
                className="form-control" />

            {suggestionsCities?.length > 0 &&
            <Col ref={suggestionRef} className="position-relative">
                <div className="list-group pt-1 position-absolute w-100">
                    {suggestionsCities.slice(0, 6).map((city: { [key: string]: string }, i: number) => {
                        return <button
                            key={city.cityKey}
                            onClick={() => handleChooseCity(city.cityName)}
                            type="button"
                            className="list-group-item list-group-item-action">
                            {city.cityName}, {city.cityCountry}
                        </button>;
                    })}
                </div>
            </Col>
            }
        </Col>
    );
};

export default Search;
