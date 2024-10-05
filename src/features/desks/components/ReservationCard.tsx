import { styled } from "@mui/material";
import Reservation from "../../../models/reservations.model";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FeatureChip } from "./FeatureChip";
import { Button } from "@mui/material/";
import { deleteReservation } from "../api/reservationsApi";

type ReservationCardProps = Reservation & {
};

const CardStyled = styled(Card)`
    width: 20rem;
    padding: ${({ theme }) => theme.spacing(2, 4)};
`;

const HeaderBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FeaturesBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
`;

export const ReservationCard = (props: ReservationCardProps) => {
  return (
    <CardStyled>
      <>
        <HeaderBox>
          <Typography variant="h6"> {props.deskName}</Typography>
          <Button variant='contained' onClick={() => deleteReservation(props.id)}>delete</Button>
        </HeaderBox>
      </>
      <FeaturesBox>
        {props.deskFeatures.map(feature => (
          <FeatureChip key={feature} feature={feature} />
        ))}
      </FeaturesBox>

    </CardStyled>
  );

};