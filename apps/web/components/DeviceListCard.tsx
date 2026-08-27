import Link from 'next/link';
import { CloudDevice } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { InfiniteBattery } from './InfiniteBattery';

const platformIcon: Record<CloudDevice['platform'], string> = {
  android: '🤖',
  ios: '🍎',
};

export function DeviceListCard({ device }: { device: CloudDevice }) {
  const storagePct = Math.min(100, Math.round((device.storageUsedGb / device.storageGb) * 100));

  return (
    <Link
      href={`/dashboard/devices/${device.id}`}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/60"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-alt text-lg">
            {platformIcon[device.platform]}
          </div>
          <div>
            <p className="text-sm font-bold">{device.name}</p>
            <p className="text-xs text-muted">
              {device.osVersion} · {device.deviceCode}
            </p>
          </div>
        </div>
        <InfiniteBattery compact />
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={device.status} />
        <span className="text-xs text-muted">
          {device.storageGb >= 1024 ? `${device.storageGb / 1024} TB` : `${device.storageGb} GB`} / {device.ramGb} GB
        </span>
      </div>

      {device.autoPlayEnabled && (
        <div className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1.5 text-xs font-semibold text-accent">
          🎮 Farmando {device.autoPlayGame} 24/7
        </div>
      )}

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
        <div className="h-full rounded-full bg-primary" style={{ width: `${storagePct}%` }} />
      </div>
      <p className="text-[11px] text-faint">
        {device.storageUsedGb} GB usados · Wi-Fi {device.wifiEnabled ? 'conectado' : 'desligado'}
      </p>
    </Link>
  );
}
