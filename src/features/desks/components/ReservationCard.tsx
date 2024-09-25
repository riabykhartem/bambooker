import styled from "@emotion/styled";
import Reservation from "../../../models/reservations.model";
import Card from "@mui/material/Card";

type ReservationCard = Reservation & {
  onDeleteReservation: () => void;
}

const CardStyled = styled(Card)`
    width: 20rem;
    padding: ${({ theme }) => theme.spacing(2, 4)};
`;

export const ReservationCard = () => {
  <CardStyled>
  </CardStyled>
}