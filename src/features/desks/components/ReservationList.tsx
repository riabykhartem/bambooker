import { useEffect, useState } from "react";
import { getReservations } from "../api/reservationsApi";
import { ReservationCard } from "./ReservationCard";
import Reservation from "../../../models/reservations.model";
import { List, ListItem } from "@mui/material";
import { DeleteReservationDialog } from "./DeleteReservationDialog";

export const ReservationList = () => {
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedRervation] = useState<Reservation | null>(null);

  useEffect(() => {
    getReservations()
      .then((res) => {
        setActiveReservations(res);
      });

  }, []);

  const onDelete = (reservedDesk: Reservation) => {
    setSelectedRervation(reservedDesk);
  };

  const onClose = () => {
    setSelectedRervation(null);
    getReservations()
      .then((res) => {
        setActiveReservations(res);
      });
  }


  return (<>
    <List>
      {
        activeReservations.map((r, index) => (
          <ListItem key={index}>
            <ReservationCard {...r} onDelete={() => onDelete(r)} />
          </ListItem>
        ))
      }
    </List>
    {selectedReservation && (
      <DeleteReservationDialog
        reservation={selectedReservation}
        dialogIsOpen={!!selectedReservation}
        onClose={onClose}
      ></DeleteReservationDialog>

    )}
  </>
  );
};


