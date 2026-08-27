import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/StatusBadge';
import { formatStorage } from '@/lib/format';
import { getInfraStats, listDevices } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const stats = getInfraStats();
  const devices = listDevices();

  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/icons/icon-192.png" alt="Rael Cloud Phone" width={28} height={28} className="rounded-lg" />
            <span className="text-sm font-bold">Rael Cloud Phone · Admin</span>
          </Link>
          <Link href="/dashboard" className="text-xs font-semibold text-muted hover:text-foreground">
            ← Voltar ao dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <h1 className="text-2xl font-extrabold">Infraestrutura</h1>
        <p className="mt-1 text-sm text-muted">Visão geral de todos os dispositivos em nuvem da plataforma.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Devices" value={stats.totalDevices} />
          <StatTile label="Android" value={stats.androidDevices} />
          <StatTile label="iOS" value={stats.iosDevices} />
          <StatTile label="Online" value={stats.onlineDevices} accent />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <UsageTile label="CPU Cloud" pct={stats.cpuCloudPct} />
          <UsageTile label="RAM Cloud" pct={stats.ramCloudPct} />
          <UsageTile label="Storage" pct={stats.storageCloudPct} />
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-xs uppercase text-muted">
                <th className="px-4 py-3 font-semibold">Dispositivo</th>
                <th className="px-4 py-3 font-semibold">Plataforma</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">CPU</th>
                <th className="px-4 py-3 font-semibold">RAM</th>
                <th className="px-4 py-3 font-semibold">Storage</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{device.name}</p>
                    <p className="text-xs text-muted">{device.deviceCode}</p>
                  </td>
                  <td className="px-4 py-3 text-muted">{device.platform === 'android' ? 'Android' : 'iOS'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={device.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">{device.cpuLoadPct}%</td>
                  <td className="px-4 py-3 text-muted">{device.ramLoadPct}%</td>
                  <td className="px-4 py-3 text-muted">
                    {device.storageUsedGb} GB / {formatStorage(device.storageGb)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatTile({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className={`text-2xl font-extrabold ${accent ? 'text-accent' : ''}`}>{value.toLocaleString('pt-BR')}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

function UsageTile({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-bold">{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
