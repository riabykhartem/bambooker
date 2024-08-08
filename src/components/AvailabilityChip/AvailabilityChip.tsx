import { Chip } from '@mui/material';

interface availabilityChipProps {
    isAvailable: Boolean
}

export const AvailabilityChip = (props: availabilityChipProps) => {

    const chip = (
        <Chip label={props.isAvailable ? 'Available' : 'Not available'} />
    );

    return chip;
}