'use client';

import { useMemo, useState } from 'react';
import { CloudDevice } from '@/lib/types';
import { DeviceListCard } from './DeviceListCard';

type FilterKey = 'all' | 'android' | 'ios' | 'online' | 'offline' | 'starting';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'android', label: 'Android' },
  { key: 'ios', label: 'iOS' },
  { key: 'online', label: 'Online' },
  { key: 'offline', label: 'Offline' },
  { key: 'starting', label: 'Em inicialização' },
];

export function DeviceGrid({ devices }: { devices: CloudDevice[] }) {
  const [filter, setFilter] = useState<FilterKey>('all');

  const summary = useMemo(
    () => ({
      total: devices.length,
      online: devices.filter((d) => d.status === 'online').length,
      starting: devices.filter((d) => d.status === 'starting').length,
      offline: devices.filter((d) => d.status === 'offline' || d.status === 'terminated').length,
    }),
    [devices]
  );

  const filtered = useMemo(() => {
    switch (filter) {
      case 'android':
        return devices.filter((d) => d.platform === 'android');
      case 'ios':
        return devices.filter((d) => d.platform === 'ios');
      case 'online':
        return devices.filter((d) => d.status === 'online');
      case 'offline':
        return devices.filter((d) => d.status === 'offline' || d.status === 'terminated');
      case 'starting':
        return devices.filter((d) => d.status === 'starting');
      default:
        return devices;
    }
  }, [devices, filter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile label="Total" value={summary.total} />
        <SummaryTile label="🟢 Online" value={summary.online} />
        <SummaryTile label="🟡 Inicializando" value={summary.starting} />
        <SummaryTile label="🔴 Offline" value={summary.offline} />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              filter === f.key
                ? 'border-primary bg-primary text-background'
                : 'border-border bg-surface text-muted hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted">
          Nenhum dispositivo encontrado com esse filtro.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((device) => (
            <DeviceListCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3">
      <p className="text-lg font-extrabold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
