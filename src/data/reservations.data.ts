import dayjs from 'dayjs';
import Reservation from '../models/reservations.model';

export const reservations: Reservation[] = [
  {
    id: '1',
    deskName: 'antoshka',
    deskFeatures: [1, 2],
    deskId: '1',
    date: dayjs('2024-08-16'),
  },
];
