'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { DeviceScreenClient } from '@/components/DeviceScreenClient';
import { useDeviceStore } from '@/lib/deviceStore';

function ViewDeviceInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getDevice } = useDeviceStore();
  const device = id ? getDevice(id) : undefined;

  if (!device) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted">
        Dispositivo não encontrado.{' '}
        <Link href="/dashboard" className="font-semibold text-primary">
          Voltar para meus dispositivos
        </Link>
      </div>
    );
  }

  return <DeviceScreenClient device={device} />;
}

export default function ViewDevicePage() {
  return (
    <Suspense fallback={null}>
      <ViewDeviceInner />
    </Suspense>
  );
}
