import { describe, it, expect, vi } from 'vitest';
import Reservation from '../../../../models/reservations.model';
import dayjs from 'dayjs';
import { getDesks } from '../desksApi';

const mockReservation: Reservation[] = [
  {
    id: '1',
    deskId: '1',
    date: dayjs('2024-10-11'),
  },
];

vi.mock('../../../../data/reservations.data.ts', () => {
  return {
    reservations: mockReservation,
  };
});

describe('getDesks', () => {
  it('should return desks with isAvailable = false', async () => {
    const desks = await getDesks({
      locationId: 'c80ae63',
      selectedDate: dayjs('2024-10-11'),
    });

    expect(desks[0]).to.have.property('isAvailable', false);
  });
});
