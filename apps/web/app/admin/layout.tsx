import { DeviceStoreProvider } from '@/lib/deviceStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DeviceStoreProvider>{children}</DeviceStoreProvider>;
}
