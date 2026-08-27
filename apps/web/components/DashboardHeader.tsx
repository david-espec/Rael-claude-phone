import Image from 'next/image';
import Link from 'next/link';
import { withBasePath } from '@/lib/basePath';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={withBasePath('/icons/icon-192.png')}
            alt="Rael Cloud Phone"
            width={30}
            height={30}
            className="rounded-lg"
          />
          <span className="text-sm font-bold tracking-tight">Rael Cloud Phone</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notificações"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-sm hover:bg-surface-alt"
          >
            🔔
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
          <button
            aria-label="Configurações"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-sm hover:bg-surface-alt"
          >
            ⚙️
          </button>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold">Conta ativa</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-sm font-bold">
            U
          </div>
          <Link
            href="/dashboard/devices/new"
            className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-background hover:bg-primary-dark sm:px-4 sm:text-sm"
          >
            + Criar dispositivo
          </Link>
        </div>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-4 px-6 pb-3 text-xs font-semibold text-muted">
        <Link href="/dashboard" className="hover:text-foreground">
          Meus dispositivos
        </Link>
        <Link href="/admin" className="hover:text-foreground">
          Painel administrativo
        </Link>
      </nav>
    </header>
  );
}
