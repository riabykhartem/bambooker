import { Desk, DeskFeature } from './desk.model.ts';

export const desks: Desk[] = [
  {
    id: '1',
    name: 'A1-01',
    features: [
      DeskFeature.TwoMonitors,
      DeskFeature.Headset,
      DeskFeature.Camera,
    ],
  },
  {
    id: '2',
    name: 'A1-02',
    features: [
      DeskFeature.TwoMonitors,
      DeskFeature.Quiet,
    ],
  },
  {
    id: '3',
    name: 'A1-03',
    features: [
      DeskFeature.Headset,
      DeskFeature.Camera,
      DeskFeature.Shared,
      DeskFeature.Whiteboard,
    ],
  },
  {
    id: '4',
    name: 'A1-04',
    features: [
      DeskFeature.Shared,
      DeskFeature.Whiteboard,
    ],
  },
  {
    id: '5',
    name: 'A1-05',
    features: [
      DeskFeature.TwoMonitors,
      DeskFeature.Headset,
    ],
  },
  {
    id: '6',
    name: 'A1-06',
    features: [
      DeskFeature.Headset,
      DeskFeature.Camera,
    ],
  },
]