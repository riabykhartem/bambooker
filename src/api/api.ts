import { Desk } from './desk.model.ts';
import { desks } from './desks.data.ts';

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

export const getDesks = (params: { query: string }) => {
  return new Promise<Desk[]>((resolve) => {
    setTimeout(() => {
      resolve(desks.filter(d => d.name.includes(params.query)));
    }, 300);
  })
}