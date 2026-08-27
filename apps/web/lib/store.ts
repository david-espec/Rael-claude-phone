import { androidApps, deviceCatalog, iosApps } from './catalog';
import { CloudDevice, InfraStats, Platform } from './types';

interface Store {
  devices: CloudDevice[];
  counters: Record<Platform, number>;
}

const globalForStore = globalThis as unknown as { __raelCloudStore?: Store };

function seedDevices(): CloudDevice[] {
  const now = Date.now();
  const galaxy = deviceCatalog[0];
  const iphone = deviceCatalog[1];

  return [
    {
      id: 'seed-android-1',
      deviceCode: 'CLOUD-AND-000001',
      userId: 'demo-user',
      name: 'Galaxy S26 Ultra #01',
      platform: 'android',
      modelId: galaxy.id,
      modelName: galaxy.name,
      osVersion: galaxy.osVersion,
      hardware: galaxy.hardware,
      storageGb: 1024,
      storageUsedGb: 18,
      ramGb: 16,
      status: 'online',
      wifiEnabled: true,
      wifiNetwork: 'CloudNetwork',
      cpuLoadPct: 23,
      ramLoadPct: 41,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 40).toISOString(),
      lastConnectedAt: new Date(now - 1000 * 60 * 2).toISOString(),
      uptimeSeconds: 60 * (60 * 24 * 37 + 60 * 14 + 32),
      apps: androidApps,
      autoPlayEnabled: false,
      autoPlayGame: null,
      autoPlaySince: null,
    },
    {
      id: 'seed-android-2',
      deviceCode: 'CLOUD-AND-000002',
      userId: 'demo-user',
      name: 'Galaxy S26 Ultra #02',
      platform: 'android',
      modelId: galaxy.id,
      modelName: galaxy.name,
      osVersion: galaxy.osVersion,
      hardware: galaxy.hardware,
      storageGb: 512,
      storageUsedGb: 96,
      ramGb: 12,
      status: 'online',
      wifiEnabled: true,
      wifiNetwork: 'CloudNetwork',
      cpuLoadPct: 61,
      ramLoadPct: 72,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 12).toISOString(),
      lastConnectedAt: new Date(now - 1000 * 60 * 20).toISOString(),
      uptimeSeconds: 60 * (60 * 24 * 12 + 60 * 3),
      apps: androidApps,
      autoPlayEnabled: true,
      autoPlayGame: 'Free Fire',
      autoPlaySince: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
    },
    {
      id: 'seed-ios-1',
      deviceCode: 'CLOUD-IOS-000001',
      userId: 'demo-user',
      name: 'iPhone 17 Pro Max #01',
      platform: 'ios',
      modelId: iphone.id,
      modelName: iphone.name,
      osVersion: iphone.osVersion,
      hardware: iphone.hardware,
      storageGb: 1024,
      storageUsedGb: 54,
      ramGb: 16,
      status: 'online',
      wifiEnabled: true,
      wifiNetwork: 'CloudNetwork',
      cpuLoadPct: 15,
      ramLoadPct: 33,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(),
      lastConnectedAt: new Date(now - 1000 * 60 * 5).toISOString(),
      uptimeSeconds: 60 * (60 * 24 * 5 + 60 * 6),
      apps: iosApps,
      autoPlayEnabled: false,
      autoPlayGame: null,
      autoPlaySince: null,
    },
  ];
}

function getStore(): Store {
  if (!globalForStore.__raelCloudStore) {
    globalForStore.__raelCloudStore = {
      devices: seedDevices(),
      counters: { android: 2, ios: 1 },
    };
  }
  return globalForStore.__raelCloudStore;
}

export function listDevices(): CloudDevice[] {
  return getStore().devices;
}

export function getDevice(id: string): CloudDevice | undefined {
  return getStore().devices.find((d) => d.id === id);
}

export function getInfraStats(): InfraStats {
  const devices = listDevices();
  const online = devices.filter((d) => d.status === 'online').length;
  const offline = devices.filter((d) => d.status === 'offline' || d.status === 'terminated').length;
  const cpu = devices.length ? Math.round(devices.reduce((s, d) => s + d.cpuLoadPct, 0) / devices.length) : 0;
  const ram = devices.length ? Math.round(devices.reduce((s, d) => s + d.ramLoadPct, 0) / devices.length) : 0;
  const storage = devices.length
    ? Math.round(
        (devices.reduce((s, d) => s + d.storageUsedGb, 0) / devices.reduce((s, d) => s + d.storageGb, 0)) * 100
      )
    : 0;

  return {
    totalDevices: devices.length,
    androidDevices: devices.filter((d) => d.platform === 'android').length,
    iosDevices: devices.filter((d) => d.platform === 'ios').length,
    onlineDevices: online,
    offlineDevices: offline,
    cpuCloudPct: cpu,
    ramCloudPct: ram,
    storageCloudPct: storage,
  };
}

export function createDevice(input: {
  platform: Platform;
  modelId: string;
  configId: string;
  name?: string;
}): CloudDevice {
  const store = getStore();
  const model = deviceCatalog.find((m) => m.id === input.modelId);
  if (!model) throw new Error('Modelo não encontrado');
  const config = model.configs.find((c) => c.id === input.configId);
  if (!config) throw new Error('Configuração não encontrada');

  store.counters[input.platform] += 1;
  const seq = store.counters[input.platform];
  const code = `CLOUD-${input.platform === 'android' ? 'AND' : 'IOS'}-${String(seq).padStart(6, '0')}`;
  const now = new Date().toISOString();

  const device: CloudDevice = {
    id: `${input.platform}-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    deviceCode: code,
    userId: 'demo-user',
    name: input.name?.trim() || `${model.name} #${String(seq).padStart(2, '0')}`,
    platform: input.platform,
    modelId: model.id,
    modelName: model.name,
    osVersion: model.osVersion,
    hardware: model.hardware,
    storageGb: config.storageGb,
    storageUsedGb: 2,
    ramGb: config.ramGb,
    status: 'starting',
    wifiEnabled: true,
    wifiNetwork: 'CloudNetwork',
    cpuLoadPct: 4,
    ramLoadPct: 9,
    createdAt: now,
    lastConnectedAt: now,
    uptimeSeconds: 0,
    apps: input.platform === 'android' ? androidApps : iosApps,
    autoPlayEnabled: false,
    autoPlayGame: null,
    autoPlaySince: null,
  };

  store.devices.unshift(device);
  return device;
}

export function updateDevice(id: string, patch: Partial<CloudDevice>): CloudDevice | undefined {
  const store = getStore();
  const device = store.devices.find((d) => d.id === id);
  if (!device) return undefined;
  Object.assign(device, patch);
  return device;
}

export function duplicateDevice(id: string): CloudDevice | undefined {
  const source = getDevice(id);
  if (!source) return undefined;
  return createDevice({ platform: source.platform, modelId: source.modelId, configId: 'a', name: `${source.name} (cópia)` });
}

export function deleteDevice(id: string): boolean {
  const store = getStore();
  const index = store.devices.findIndex((d) => d.id === id);
  if (index === -1) return false;
  store.devices.splice(index, 1);
  return true;
}
