import { Desk } from '../../api/desk.model.ts';
import { Box, Card, styled, Typography } from '@mui/material';
import { FeatureChip } from '../FeatureChip/FeatureChip.tsx';
import { AvailabilityChip } from '../AvailabilityChip/AvailabilityChip.tsx';

const CardStyled = styled(Card)`
    width: 20rem;
    padding: ${({ theme }) => theme.spacing(2, 4)};
`;

const DeskNameTypography = styled(Typography)`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FeaturesBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
`;

export interface DeskListItemProps extends Desk {
}

export const DeskCard = (props: DeskListItemProps) => {
  return (
    <CardStyled>
      <DeskNameTypography variant="h6">{props.name}</DeskNameTypography>
      <FeaturesBox>
        {props.features.map(feature => (
          <FeatureChip key={feature} feature={feature} />
        ))}
        <AvailabilityChip isAvailable={props.isAvailable} />
      </FeaturesBox>
    </CardStyled>
  )
}