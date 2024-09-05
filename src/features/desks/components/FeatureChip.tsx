import { Chip, Tooltip } from '@mui/material';
import { DeskFeature } from '../../../models/desk.model.ts';

const featureMap: Record<DeskFeature, { label: string, description?: string }> = {
  [DeskFeature.TwoMonitors]: {
    label: '2 Monitors',
  },
  [DeskFeature.Headset]: {
    label: 'Headset',
  },
  [DeskFeature.WirelessKeyboard]: {
    label: 'Wireless Keyboard',
  },
  [DeskFeature.Camera]: {
    label: 'Camera',
  },
  [DeskFeature.Quiet]: {
    label: 'Quiet',
    description: 'Calls are restricted in this area',
  },
  [DeskFeature.Shared]: {
    label: 'Shared',
    description: 'This is a place at a shared table',
  },
  [DeskFeature.Whiteboard]: {
    label: 'Whiteboard',
    description: 'Whiteboard nearby, perfect for design',
  },
}

export interface FeatureChipProps {
  feature: DeskFeature
}

export const FeatureChip = (props: FeatureChipProps) => {
  const description = featureMap[props.feature].description;

  const chip = (
    <Chip label={featureMap[props.feature].label} />
  );

  if (description)
    return (
      <Tooltip title={description} arrow placement="top">
        {chip}
      </Tooltip>
    )

  return chip;
}