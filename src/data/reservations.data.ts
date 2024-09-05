import dayjs from 'dayjs';
import Reservation from '../models/reservations.model';

export const reservations: Reservation[] = [
  {
    id: '1',
    deskId: '1',
    date: dayjs('2024-08-16'),
  },
];
