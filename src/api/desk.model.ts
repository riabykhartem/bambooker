export interface Desk {
  id: string;
  name: string;
  locationId: string;
  features: DeskFeature[];
}

export enum DeskFeature {
  TwoMonitors,
  Headset,
  WirelessKeyboard,
  Camera,
  Quiet,
  Shared,
  Whiteboard,
}