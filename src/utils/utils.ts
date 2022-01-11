export const getWeekDay = (date: string) => {
    var weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const d = new Date(date);
    return weekDays[d.getDay()];
};

export function fahrenheitToCelcius(f: number) {
    return Math.round(((f - 32) * 5) / 9);
}
