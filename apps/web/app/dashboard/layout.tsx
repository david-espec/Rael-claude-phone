import { DashboardHeader } from '@/components/DashboardHeader';
import { DeviceStoreProvider } from '@/lib/deviceStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeviceStoreProvider>
      <div className="flex flex-1 flex-col bg-background">
        <DashboardHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</main>
      </div>
    </DeviceStoreProvider>
  );
}
