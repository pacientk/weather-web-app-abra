export interface ICurrentCityData {
    currentCityData:   CurrentCityData;
    suggestionsCities: any[];
    favorites:         Favorite[];
    degreeType:        number;
}

export interface CurrentCityData {
    name:     string;
    cityKey:  string | number;
    weather:  Weather;
    forecast: Forecast[];
}

export interface Forecast {
    Date:        Date;
    EpochDate:   number;
    Temperature: Temperature;
    Day:         Day;
    Night:       Day;
    Sources:     string[];
    MobileLink:  string;
    Link:        string;
}

export interface Day {
    Icon:                    number;
    IconPhrase:              string;
    HasPrecipitation:        boolean;
    PrecipitationType?:      string;
    PrecipitationIntensity?: string;
}

export interface Temperature {
    Minimum: Imum;
    Maximum: Imum;
}

export interface Imum {
    Value:    number;
    Unit:     string;
    UnitType: number;
}

export interface Weather {
    value:       number;
    unit:        string;
    weatherType: string;
}

export interface Favorite {
    cityKey:     string;
    cityName:    string;
    temperValue: number;
    weatherType: string;
}
////////////////
export interface ISearchCitiesData {
    Version:                number;
    Key:                    string;
    Type:                   string;
    Rank:                   number;
    LocalizedName:          string;
    EnglishName:            string;
    PrimaryPostalCode:      string;
    Region:                 Country;
    Country:                Country;
    AdministrativeArea:     AdministrativeArea;
    TimeZone:               TimeZone;
    GeoPosition:            GeoPosition;
    IsAlias:                boolean;
    SupplementalAdminAreas: SupplementalAdminArea[];
    DataSets:               string[];
}

export interface AdministrativeArea {
    ID:            string;
    LocalizedName: string;
    EnglishName:   string;
    Level:         number;
    LocalizedType: string;
    EnglishType:   string;
    CountryID:     string;
}

export interface Country {
    ID:            string;
    LocalizedName: string;
    EnglishName:   string;
}

export interface GeoPosition {
    Latitude:  number;
    Longitude: number;
    Elevation: Elevation;
}

export interface Elevation {
    Metric:   Imperial;
    Imperial: Imperial;
}

export interface Imperial {
    Value:    number;
    Unit:     string;
    UnitType: number;
}

export interface SupplementalAdminArea {
    Level:         number;
    LocalizedName: string;
    EnglishName:   string;
}

export interface TimeZone {
    Code:             string;
    Name:             string;
    GmtOffset:        number;
    IsDaylightSaving: boolean;
    NextOffsetChange: Date | null;
}
////////////
export interface IWeatherByCityKey {
    DateTime:                 Date;
    EpochDateTime:            number;
    WeatherIcon:              number;
    IconPhrase:               string;
    HasPrecipitation:         boolean;
    IsDaylight:               boolean;
    Temperature:              Imum;
    PrecipitationProbability: number;
    MobileLink:               string;
    Link:                     string;
}
