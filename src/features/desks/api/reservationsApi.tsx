import { reservations } from '../../../data/reservations.data';
import { DeskFeature } from '../../../models/desk.model';
import Reservation from '../../../models/reservations.model';
import { Dayjs } from 'dayjs';


export const addReservation = (props: { deskId: string; deskName: string; deskFeatures: DeskFeature[], date: Dayjs }) => {
  const newReservation: Reservation = {
    id: reservations.length.toString(),
    deskId: props.deskId,
    deskName: props.deskName,
    deskFeatures: props.deskFeatures,
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

export const deleteReservation = (id: string) => {

  return new Promise((resolve, reject) => {
    const reservationIndex = reservations.findIndex((r) => r.id === id);
    console.log(reservations[reservationIndex]);
    setTimeout(() => {
      if (reservationIndex !== -1) {
        resolve(`${reservations[reservationIndex]} has been deleted`);
        reservations.splice(reservationIndex, 1);
      } else {
        reject(new Error("reservation not found"));
      }
    }, 2000);
  });
};