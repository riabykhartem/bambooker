import { useEffect, useState } from "react";
import { getReservations } from "../api/reservationsApi";
import { ReservationCard } from "./ReservationCard";
import Reservation from "../../../models/reservations.model";
import { List, ListItem } from "@mui/material";



export const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getReservations()
      .then((reservations) => {
        setReservations(reservations);
      });

  }, []);

  return (
    <List>
      {
        reservations.map((r) => {
          <ListItem>
            <ReservationCard id={r.id} deskId={r.deskId} deskName={r.deskId} deskFeatures={r.deskFeatures} />
          </ListItem>;
        })
      }

    </List>


  )
}


