import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch } from 'react-redux';
// import { fetchWeather } from '../../store/fetchWeather';
// import { fetchCities } from './../../api/placeSuggestion';
// import { useClickOutside } from './../../hooks/useClickOutside';
// import { LocationButton, LocationIcon, SearchElement, SearchIcon, SearchInput, SearchResult } from './styled';
// import Suggestion from './Suggestion';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const suggestionRef = useRef(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    console.log('@@@@ searchTerm',searchTerm);

    useEffect(() => {
        if (!searchTerm) {
            return;
        }
        setShowSuggestions(true);
        console.log('@@@@ searchTerm',searchTerm);
        // fetchCities(searchTerm).then((res) => {
        //     setSuggestions(res);
        // });
    }, [searchTerm]);

    const useClickOutside = (element: any, callback: Function) => {
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

    useClickOutside(suggestionRef, () => setShowSuggestions(false));

    const onSearchInputChanged = (e: any) => {
        console.log('@@@@ onSearchInputChanged',);
        setSearchTerm(e.target.value);
    };

    const searchInput = ()=>{
        return(
            <input type="text" className="form-control" aria-label="Text input with dropdown button"/>
        )
    }

    return (
        <div>
            {/*<SearchIcon />*/}
            {/*<DebounceInput element={searchInput} debounceTimeout={300} onChange={onSearchInputChanged} placeholder="Search for location" />*/}
            {/*<InputGroup className="mb-3 mt-3" size="lg" onChange={onSearchInputChanged}>*/}
            {/*    <FormControl*/}
            {/*        placeholder="Search for Location"*/}
            {/*        aria-label="Search for Location"*/}
            {/*        aria-describedby="city-search"*/}
            {/*    />*/}
            {/*    <Button variant="outline-secondary" id="city-search">*/}
            {/*        Search*/}
            {/*    </Button>*/}
            {/*</InputGroup>*/}

            <DebounceInput
                element={searchInput}
                minLength={3}
                debounceTimeout={300}
                onChange={onSearchInputChanged} />

            {/*{showSuggestions && (*/}
            {/*    <div ref={suggestionRef}>*/}
            {/*        {suggestions?.slice(0, 6)?.map((s, i) => (*/}
            {/*            <>*/}
            {/*            <div>{s} {i}</div>*/}
            {/*            </>*/}
            {/*            // <Suggestion*/}
            {/*            //     key={i}*/}
            {/*            //     label={s}*/}
            {/*            //     hideSuggestionFn={() => {*/}
            {/*            //         setShowSuggestions(false);*/}
            {/*            //     }}*/}
            {/*            // />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default Search;
