import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setDegreeType, TempUnit } from '../../store/reducers/weatherReducer';


const UnitSwitch = () => {
    const dispatch = useAppDispatch();
    const [isCelcius, setIsCelcius] = useState(true);

    useEffect(() => {
        isCelcius ? dispatch(setDegreeType(TempUnit.CELCIUS)) : dispatch(setDegreeType(TempUnit.FAHRENHEIT));
    }, [isCelcius]);

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsCelcius(prev => !prev);
    };
    return (
        <>
            <label className="form-check-label mx-2" htmlFor="temperUnit">{'\xB0F'}</label>
            <div className="form-check form-switch">
                <input
                    checked={isCelcius}
                    onChange={handleUnitChange}
                    className="form-check-input" style={{ backgroundColor: '#d5d4d4', borderColor: '#afafaf' }}
                    type="checkbox"
                    role="switch"
                    id="temperUnit" />
            </div>
            <label className="form-check-label" htmlFor="temperUnit">{'\xB0C'}</label>
        </>
    );
};

export default UnitSwitch;

