import dayjs, { Dayjs } from 'dayjs';
//todo: split model and date
export interface Reservation {
    id: string,
    deskId: string,
    date: Dayjs
}

export const reservations: Reservation[] = [
    {
        id: "1",
        deskId: "1",
        date: dayjs("2024-08-16")
    }

]