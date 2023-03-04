import { CITIES } from "utils/constant";
import { ICity } from "utils/types";
import haversine from "haversine-distance";

export const getCities = (filter: string) =>
  new Promise((resolve, reject) => {
    if (filter === "fail") {
      setTimeout(() => reject(new Error("City not found")), 250);
    }

    const filterValues =
      filter !== ""
        ? CITIES?.filter(({ name }) =>
            name?.toLowerCase().includes(filter?.toLowerCase())
          )
        : CITIES;

    if (!filterValues.length) {
      setTimeout(() => reject(new Error("City not found")), 250);
    }
    setTimeout(() => resolve(Object.values(filterValues)), 500);
  });

export const getDistance = (destinations: ICity[]) =>
  new Promise((resolve, reject) => {
    if (destinations?.find(({ name }) => "Dijon" === name)) {
      setTimeout(() => reject(new Error("error")), 250);
    }

    const resp = distance(destinations);
    setTimeout(() => resolve(Object.values(resp)), 500);
  });

const distance = (destinations: ICity[]) => {
  let distance: number[] = [];
  destinations?.forEach(({ order, name, lat, lon }, index) => {
    const a = { latitude: lat, longitude: lon };
    const b = {
      latitude: destinations[index + 1]?.lat,
      longitude: destinations[index + 1]?.lon,
    };
    const d = haversine(a, b);
    if (!isNaN(d)) distance.push(d / 1000);
  });
  return distance;
};
