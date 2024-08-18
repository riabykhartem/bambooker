import { Desk } from '../../api/desk.model.ts';
import { Box, Button, Card, styled, Typography } from '@mui/material';
import { FeatureChip } from '../FeatureChip/FeatureChip.tsx';
import { AvailabilityChip } from '../AvailabilityChip/AvailabilityChip.tsx';

const CardStyled = styled(Card)`
    width: 20rem;
    padding: ${({ theme }) => theme.spacing(2, 4)};
`;

const DeskNameTypography = styled(Typography)`
`;

const FeaturesBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
`;

const HeaderBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

type DeskCardProps = Desk & {
  onReserveClick: (deskId: string) => void
}

export const DeskCard = (props: DeskCardProps) => {
  return (
    <CardStyled>
      <HeaderBox>
        <DeskNameTypography variant="h6">{props.name}</DeskNameTypography>
        {props.isAvailable && <Button variant='contained' onClick={() => props.onReserveClick(props.id)}>reserve</Button>}
      </HeaderBox>
      <FeaturesBox>
        {props.features.map(feature => (
          <FeatureChip key={feature} feature={feature} />
        ))}
        <AvailabilityChip isAvailable={props.isAvailable} />
      </FeaturesBox>
    </CardStyled>
  )
}