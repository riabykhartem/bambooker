const validCredentials = [
  { username: 'user', password: 'user' },
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
};
