import { Chip } from '@mui/material';

interface availabilityChipProps {
    isAvailable?: boolean
}

export const AvailabilityChip = (props: availabilityChipProps) => {

    const chip = (
        <Chip label={props.isAvailable ? 'Available' : 'Not available'} />
    );

    return chip;
}