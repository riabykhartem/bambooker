import { reservations } from '../../../data/reservations.data';
import Reservation from '../../../models/reservations.model';
import { Dayjs } from 'dayjs';


export const addReservation = (props: { deskId: string; date: Dayjs }) => {
  const newReservation: Reservation = {
    id: reservations.length.toString(),
    deskId: props.deskId,
    date: props.date
  };
  return new Promise<Reservation>((resolve, reject) => {
    setTimeout(() => {
      reservations.push(newReservation);
      resolve(newReservation);
      // reject(new Error('fail'));
    }, 1500);
  });
};