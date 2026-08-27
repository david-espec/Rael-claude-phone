import { notFound } from 'next/navigation';
import { DeviceScreenClient } from '@/components/DeviceScreenClient';
import { getDevice } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function DevicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const device = getDevice(id);
  if (!device) notFound();

  return <DeviceScreenClient device={device} />;
}
