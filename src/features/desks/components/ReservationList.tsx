import { useEffect, useState } from "react";
import { getReservations } from "../api/reservationsApi";
import { ReservationCard } from "./ReservationCard";
import Reservation from "../../../models/reservations.model";
import { List, ListItem } from "@mui/material";

export const ReservationList = () => {
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getReservations()
      .then((res) => {
        setActiveReservations(res);
      }).then(() => console.log(activeReservations));

  }, []);

  return (<>
    <List>
      {
        activeReservations.map((r, index) => (
          <ListItem key={index}>
            <ReservationCard {...r} />
          </ListItem>
        ))
      }
    </List>
  </>
  );
};


