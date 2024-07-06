import { Desk, DeskFeature } from './desk.model';
import desks from './desks.data.json';
import { Location } from './location.model';
import { locations } from './locations.data';

const validCredentials = [
  {username: 'user', password: 'user'},
];

export const login = (params: { username: string, password: string }) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (validCredentials.some(x => x.username === params.username && x.password === params.password)) {
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

export const getDesks = (params: {
  locationId: string;
  searchTerm?: string;
  features?: DeskFeature[];
}) => {
  return new Promise<Desk[]>((resolve) => {
    setTimeout(() => {
      const results = desks
        .filter(d => d.locationId === params.locationId &&
          (!params.searchTerm || d.name.toLowerCase().includes(params.searchTerm.toLowerCase())) &&
          (!params.features || params.features.filter(f => d.features.some(df => df === f)).length === params.features.length));

      resolve(results);
    }, 300);
  });
}

export const getLocations = () => {
  return new Promise<Location[]>((resolve) => {
    setTimeout(() => {
      resolve(locations);
    }, 300);
  });
}