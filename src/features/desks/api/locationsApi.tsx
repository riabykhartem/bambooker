import { Location } from '../../../models/location.model';
import { locations } from '../../../data/locations.data';


export const getLocations = () => {
  return new Promise<Location[]>((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 100);
  });
};
