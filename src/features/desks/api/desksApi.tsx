import { Desk, DeskFeature } from '../../../models/desk.model';
import desks from '../../../data/desks.data.json';
import { reservations } from '../../../data/reservations.data';
import dayjs, { Dayjs } from 'dayjs';

export const getDesks = (params: {
  locationId: string;
  searchTerm?: string;
  features?: DeskFeature[];
  selectedDate?: Dayjs;
}) => {
  const selectedDate = params.selectedDate ?? dayjs();
  return new Promise<Desk[]>((resolve) => {
    setTimeout(() => {
      const results = desks
        .filter(
          (d) =>
            d.locationId === params.locationId &&
            (!params.searchTerm ||
              d.name.toLowerCase().includes(params.searchTerm.toLowerCase())) &&
            (!params.features ||
              params.features.filter((f) => d.features.some((df) => df === f))
                .length === params.features.length)
        )
        .map((d) => ({
          ...d,
          isAvailable: !reservations.some(
            (r) => selectedDate.isSame(r.date, 'day') && r.deskId === d.id
          ),
        }));

      resolve(results);
    }, 100);
  });
};