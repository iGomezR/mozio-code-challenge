import { CITIES } from "utils/constant";

export const getCities = (filter: string) =>
  new Promise((resolve, reject) => {
    if (filter === 'fail') {
        setTimeout(() => reject(new Error('City not found')), 250);
    } 

    const filterValues =
    filter !== ""
      ? CITIES?.filter(({ name }) =>
          name?.toLowerCase().includes(filter?.toLowerCase())
        )
      : CITIES;




    if(!filterValues.length){
        setTimeout(() => reject(new Error('City not found')), 250);
    }
    setTimeout(() => resolve(Object.values(filterValues)), 500);
  });
