import { Desk, DeskFeature } from './desk.model.ts';

export const generateDesks = (count: number, locationId: string, namePrefix: string) => {
  const desks: Desk[] = [];
  for (let i = 0; i < count; i++) {
    desks.push({
      id: i.toString(),
      locationId,
      name: `${namePrefix}${i}`,
      features: generateFeaturesList(),
    } as Desk);
  }

  return desks;
}

const allFeatures = [
  DeskFeature.TwoMonitors,
  DeskFeature.Headset,
  DeskFeature.WirelessKeyboard,
  DeskFeature.Camera,
  DeskFeature.Quiet,
  DeskFeature.Shared,
  DeskFeature.Whiteboard,
]

const generateFeaturesList = () => {
  const features = [];
  for (let i = 0; i < allFeatures.length; i++) {
    if (Math.random() < 0.5) features.push(allFeatures[i]);
  }
  return features;
}