export type Platform = 'android' | 'ios';

export type DeviceStatus = 'online' | 'starting' | 'maintenance' | 'offline' | 'terminated';

export interface DeviceConfig {
  id: string;
  storageGb: number;
  ramGb: number;
}

export interface DeviceModel {
  id: string;
  platform: Platform;
  brand: string;
  name: string;
  osVersion: string;
  hardware: string;
  configs: DeviceConfig[];
}

export interface AppShortcut {
  id: string;
  name: string;
  icon: string;
}

export interface CloudDevice {
  id: string;
  deviceCode: string;
  userId: string;
  name: string;
  platform: Platform;
  modelId: string;
  modelName: string;
  osVersion: string;
  hardware: string;
  storageGb: number;
  storageUsedGb: number;
  ramGb: number;
  status: DeviceStatus;
  wifiEnabled: boolean;
  wifiNetwork: string;
  cpuLoadPct: number;
  ramLoadPct: number;
  createdAt: string;
  lastConnectedAt: string;
  uptimeSeconds: number;
  apps: AppShortcut[];
  autoPlayEnabled: boolean;
  autoPlayGame: string | null;
  autoPlaySince: string | null;
}

export interface InfraStats {
  totalDevices: number;
  androidDevices: number;
  iosDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  cpuCloudPct: number;
  ramCloudPct: number;
  storageCloudPct: number;
}

export const statusMeta: Record<DeviceStatus, { label: string; dot: string; color: string }> = {
  online: { label: 'Online', dot: '🟢', color: '#33E0C2' },
  starting: { label: 'Inicializando', dot: '🟡', color: '#FFB84D' },
  maintenance: { label: 'Em manutenção', dot: '🔵', color: '#5B8CFF' },
  offline: { label: 'Offline', dot: '🔴', color: '#FF6B6B' },
  terminated: { label: 'Encerrado pelo usuário', dot: '⚫', color: '#5A6280' },
};
