import { Dayjs } from 'dayjs';

export default interface Reservation {
  id: string;
  deskId: string;
  deskName: string;
  date: Dayjs;
}
