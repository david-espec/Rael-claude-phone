import { DeviceGrid } from '@/components/DeviceGrid';
import { listDevices } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const devices = listDevices();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold">Meus dispositivos</h1>
        <p className="mt-1 text-sm text-muted">
          Todos os seus celulares na nuvem, sempre ligados e farmando Roblox por você.
        </p>
      </div>
      <DeviceGrid devices={devices} />
    </div>
  );
}
