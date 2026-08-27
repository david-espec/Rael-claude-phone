export type DeviceStatus = 'running' | 'auto-play' | 'stopped' | 'starting';

export interface CloudDevice {
  id: string;
  name: string;
  androidVersion: string;
  region: string;
  status: DeviceStatus;
  latencyMs: number;
  storageUsedGb: number;
  storageTotalGb: number;
  autoPlayEnabled: boolean;
  minutesRemaining: number;
  thumbnailColor: string;
}

export type BillingCycle = 'hourly' | 'monthly' | 'yearly';

export interface Plan {
  id: string;
  cycle: BillingCycle;
  title: string;
  price: string;
  priceSuffix: string;
  highlight?: string;
  features: string[];
  popular?: boolean;
}

export interface Region {
  id: string;
  name: string;
  country: string;
  pingMs: number;
}
