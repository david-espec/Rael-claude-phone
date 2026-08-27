'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { androidApps, deviceCatalog, iosApps } from './catalog';
import { CloudDevice, InfraStats, Platform } from './types';

const DEVICES_KEY = 'rael-cloud-phone:devices';
const COUNTERS_KEY = 'rael-cloud-phone:counters';

type Counters = Record<Platform, number>;

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
      name: 'Farm Roblox #02',
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
      autoPlayGame: 'Roblox',
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

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing / storage disabled — the app still works, just without persistence.
  }
}

interface CreateDeviceInput {
  platform: Platform;
  modelId: string;
  configId: string;
  name?: string;
}

interface DeviceStoreValue {
  devices: CloudDevice[];
  stats: InfraStats;
  getDevice: (id: string) => CloudDevice | undefined;
  createDevice: (input: CreateDeviceInput) => CloudDevice;
  updateDevice: (id: string, patch: Partial<CloudDevice>) => void;
  duplicateDevice: (id: string) => CloudDevice | undefined;
  deleteDevice: (id: string) => void;
}

const DeviceStoreContext = createContext<DeviceStoreValue | null>(null);

export function DeviceStoreProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<CloudDevice[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const countersRef = useRef<Counters>({ android: 2, ios: 1 });

  useEffect(() => {
    const storedDevices = readJson<CloudDevice[]>(DEVICES_KEY);
    const storedCounters = readJson<Counters>(COUNTERS_KEY);
    setDevices(storedDevices ?? seedDevices());
    if (storedCounters) countersRef.current = storedCounters;
    setHydrated(true);
  }, []);

  const persist = useCallback((next: CloudDevice[]) => {
    setDevices(next);
    writeJson(DEVICES_KEY, next);
  }, []);

  const getDevice = useCallback((id: string) => devices.find((d) => d.id === id), [devices]);

  const createDevice = useCallback(
    (input: CreateDeviceInput) => {
      const model = deviceCatalog.find((m) => m.id === input.modelId);
      if (!model) throw new Error('Modelo não encontrado');
      const config = model.configs.find((c) => c.id === input.configId);
      if (!config) throw new Error('Configuração não encontrada');

      const seq = countersRef.current[input.platform] + 1;
      countersRef.current = { ...countersRef.current, [input.platform]: seq };
      writeJson(COUNTERS_KEY, countersRef.current);

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

      setDevices((prev) => {
        const next = [device, ...prev];
        writeJson(DEVICES_KEY, next);
        return next;
      });

      return device;
    },
    []
  );

  const updateDevice = useCallback(
    (id: string, patch: Partial<CloudDevice>) => {
      setDevices((prev) => {
        const next = prev.map((d) => (d.id === id ? { ...d, ...patch } : d));
        writeJson(DEVICES_KEY, next);
        return next;
      });
    },
    []
  );

  const duplicateDevice = useCallback(
    (id: string) => {
      const source = devices.find((d) => d.id === id);
      if (!source) return undefined;
      return createDevice({
        platform: source.platform,
        modelId: source.modelId,
        configId: 'a',
        name: `${source.name} (cópia)`,
      });
    },
    [devices, createDevice]
  );

  const deleteDevice = useCallback((id: string) => {
    setDevices((prev) => {
      const next = prev.filter((d) => d.id !== id);
      writeJson(DEVICES_KEY, next);
      return next;
    });
  }, []);

  const stats = useMemo<InfraStats>(() => {
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
  }, [devices]);

  const value = useMemo<DeviceStoreValue>(
    () => ({ devices, stats, getDevice, createDevice, updateDevice, duplicateDevice, deleteDevice }),
    [devices, stats, getDevice, createDevice, updateDevice, duplicateDevice, deleteDevice]
  );

  if (!hydrated) return null;

  return <DeviceStoreContext.Provider value={value}>{children}</DeviceStoreContext.Provider>;
}

export function useDeviceStore(): DeviceStoreValue {
  const ctx = useContext(DeviceStoreContext);
  if (!ctx) throw new Error('useDeviceStore must be used within a DeviceStoreProvider');
  return ctx;
}
