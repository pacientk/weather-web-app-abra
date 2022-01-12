export const getWeekDay = (date: string) => {
    var weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const d = new Date(date);
    return weekDays[d.getDay()];
};

export function celciusToFahrenheit(c: number) {
    return Math.round(c * (9 / 5) + 32);
}

export function fahrenheitToCelcius(f: number) {
    return Math.round(((f - 32) * 5) / 9);
}
