import { Dayjs } from 'dayjs';
import { DeskFeature } from './desk.model';

export default interface Reservation {
  id: string;
  deskId: string;
  deskName: string;
  date?: Dayjs;
  deskFeatures: DeskFeature[];
}
