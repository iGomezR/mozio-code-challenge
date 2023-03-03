import { ICity } from "./types";
import haversine from 'haversine-distance';

export const getDistance = (destinations: ICity[]) => {
    let distance: number[] = [];
    destinations?.forEach(({ order, name, lat, lon }, index) => {
        const a = { latitude: lat, longitude: lon };
        const b = { latitude: destinations[index + 1]?.lat, longitude: destinations[index + 1]?.lon };
        const d = haversine(a, b);
        if (!isNaN(d))
            distance.push(d / 1000)
    })
    return distance;
};


export const shortDateformatter = (date: Date) => {
    const lang = "en-US";
    const month = new Intl.DateTimeFormat(lang, { month: "short" }).format(date);
    const day = new Intl.DateTimeFormat(lang, { day: "2-digit" }).format(date);
    const year = new Intl.DateTimeFormat(lang, { year: "numeric" }).format(date);
    return `${month} ${day}, ${year}`;
  };