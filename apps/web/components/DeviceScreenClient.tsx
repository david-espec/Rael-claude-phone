'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatDurationSince, formatRelativeTime, formatStorage, formatUptime } from '@/lib/format';
import { CloudDevice } from '@/lib/types';
import { InfiniteBattery } from './InfiniteBattery';
import { StatusBadge } from './StatusBadge';

export function DeviceScreenClient({ device: initialDevice }: { device: CloudDevice }) {
  const router = useRouter();
  const [device, setDevice] = useState(initialDevice);
  const [busy, setBusy] = useState<string | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(device.name);
  const [confirmingTerminate, setConfirmingTerminate] = useState(false);
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [showFarmForm, setShowFarmForm] = useState(false);
  const [gameInput, setGameInput] = useState('');

  async function runAction(action: string, body: Record<string, unknown> = {}) {
    setBusy(action);
    try {
      const res = await fetch(`/api/devices/${device.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDevice(data.device);
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    setBusy('delete');
    try {
      await fetch(`/api/devices/${device.id}`, { method: 'DELETE' });
      router.push('/dashboard');
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function handleDuplicate() {
    setBusy('duplicate');
    try {
      const res = await fetch(`/api/devices/${device.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'duplicate' }),
      });
      const data = await res.json();
      if (res.ok) router.push(`/dashboard/devices/${data.device.id}`);
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function enableFarm(game?: string) {
    const finalGame = (game ?? gameInput).trim();
    if (!finalGame) return;
    await runAction('autoplay', { enabled: true, game: finalGame });
    setShowFarmForm(false);
    setGameInput('');
  }

  async function disableFarm() {
    await runAction('autoplay', { enabled: false });
  }

  const isOn = device.status === 'online' || device.status === 'starting';

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-[520px] w-64 rounded-[40px] border-[6px] border-surface-alt bg-black shadow-xl">
          <div className="absolute left-1/2 top-2 h-4 w-24 -translate-x-1/2 rounded-full bg-surface-alt" />

          <div className="flex h-full w-full flex-col overflow-hidden rounded-[32px]">
            <div className="flex items-center justify-between px-4 pt-6 text-[10px] text-white/70">
              <span>{device.platform === 'ios' ? '•••••' : '9:41'}</span>
              <div className="flex items-center gap-1.5">
                <span>Wi-Fi {device.wifiEnabled ? '📶' : '✕'}</span>
                <InfiniteBattery compact />
              </div>
            </div>

            {device.status === 'online' && device.autoPlayEnabled && (
              <div className="mx-4 mt-3 flex items-center gap-1.5 rounded-lg bg-accent/20 px-2.5 py-1.5 text-[10px] font-semibold text-accent">
                🎮 Farmando {device.autoPlayGame} sozinho
              </div>
            )}

            {device.status === 'online' && (
              <div className="grid flex-1 grid-cols-4 content-start gap-4 p-5">
                {device.apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setOpenApp(app.name)}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg">
                      {app.icon}
                    </span>
                    <span className="text-center text-[9px] leading-tight text-white/80">{app.name}</span>
                  </button>
                ))}
              </div>
            )}

            {device.status === 'starting' && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-white/70">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
                <span className="text-xs">Inicializando {device.osVersion}…</span>
              </div>
            )}

            {!isOn && (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-white/40">
                <span className="text-3xl">⏻</span>
                <span className="text-xs">Dispositivo desligado</span>
              </div>
            )}

            {openApp && isOn && (
              <div className="absolute inset-4 flex flex-col rounded-2xl bg-surface p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{openApp}</span>
                  <button onClick={() => setOpenApp(null)} className="text-muted">
                    ✕
                  </button>
                </div>
                <div className="mt-4 flex flex-1 items-center justify-center text-center text-muted">
                  Simulação de app rodando no dispositivo em nuvem.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-64 items-center justify-around rounded-xl border border-border bg-surface py-2 text-xs text-muted">
          {device.platform === 'android' ? (
            <>
              <GestureButton label="Voltar" icon="◁" />
              <GestureButton label="Home" icon="●" />
              <GestureButton label="Apps" icon="▢" />
            </>
          ) : (
            <>
              <GestureButton label="Home" icon="⌂" />
              <GestureButton label="Control Center" icon="⌃" />
              <GestureButton label="Notificações" icon="▽" />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {renaming ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRenaming(false);
                  if (newName.trim() && newName !== device.name) runAction('rename', { name: newName });
                }}
                className="flex items-center gap-2"
              >
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-lg font-extrabold outline-none focus:border-primary"
                />
                <button type="submit" className="text-xs font-semibold text-accent">
                  Salvar
                </button>
              </form>
            ) : (
              <h1 className="text-2xl font-extrabold">{device.name}</h1>
            )}
            <p className="mt-1 text-sm text-muted">
              {device.deviceCode} · {device.modelName} · {device.osVersion}
            </p>
          </div>
          <StatusBadge status={device.status} />
        </div>

        <div
          className={`rounded-2xl border p-5 ${
            device.autoPlayEnabled ? 'border-accent/50 bg-accent/10' : 'border-border bg-surface'
          }`}
        >
          {device.autoPlayEnabled ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-accent">🎮 Farmando 24/7</p>
                <p className="mt-1 text-sm text-muted">
                  Jogando <span className="font-semibold text-foreground">{device.autoPlayGame}</span> sozinho há{' '}
                  {device.autoPlaySince ? formatDurationSince(device.autoPlaySince) : '0d 0h 0min'} — pode fechar o
                  navegador que ele continua rodando.
                </p>
              </div>
              <ActionButton label="Parar farm" tone="danger" busy={busy === 'autoplay'} onClick={disableFarm} />
            </div>
          ) : showFarmForm ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enableFarm();
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex-1">
                <p className="text-sm font-bold">Qual jogo farmar 24/7?</p>
                <input
                  autoFocus
                  value={gameInput}
                  onChange={(e) => setGameInput(e.target.value)}
                  placeholder="Roblox"
                  className="mt-2 w-full max-w-xs rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <p className="mt-1 text-[11px] text-faint">Recomendado: Roblox — mas pode ser qualquer jogo.</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFarmForm(false)}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-surface-alt"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={busy === 'autoplay' || !gameInput.trim()}
                  className="rounded-lg bg-accent px-4 py-2 text-xs font-bold text-background disabled:opacity-50"
                >
                  Iniciar farm
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold">Farm 24/7 desligado</p>
                <p className="mt-1 text-sm text-muted">
                  Ative e deixe o Roblox rendendo sozinho, com bateria infinita, mesmo com você offline.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFarmForm(true)}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-surface-alt"
                >
                  Outro jogo
                </button>
                <button
                  onClick={() => enableFarm('Roblox')}
                  disabled={busy === 'autoplay'}
                  className="rounded-lg bg-accent px-4 py-2 text-xs font-bold text-background disabled:opacity-50"
                >
                  🎮 Farmar Roblox 24/7
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton label="Abrir" busy={busy === 'open'} disabled={isOn} onClick={() => runAction('open')} />
          <ActionButton label="Reiniciar" busy={busy === 'restart'} onClick={() => runAction('restart')} />
          <ActionButton
            label="Desligar"
            busy={busy === 'shutdown'}
            disabled={!isOn}
            onClick={() => runAction('shutdown')}
          />
          <ActionButton label="Renomear" onClick={() => setRenaming(true)} />
          <ActionButton label="Duplicar" busy={busy === 'duplicate'} onClick={handleDuplicate} />
          <ActionButton label="Encerrar" tone="danger" onClick={() => setConfirmingTerminate(true)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard title="Hardware">
            <InfoRow label="Sistema" value={device.osVersion} />
            <InfoRow label="Hardware" value={device.hardware} />
            <InfoRow label="RAM" value={`${device.ramGb} GB`} />
            <InfoRow label="Armazenamento" value={formatStorage(device.storageGb)} />
            <InfoRow label="Bateria" value="∞ infinita (sempre carregando)" />
          </InfoCard>

          <InfoCard title="Uso">
            <UsageBar label="CPU" pct={device.cpuLoadPct} />
            <UsageBar label="RAM" pct={device.ramLoadPct} />
            <UsageBar label="Storage" pct={Math.round((device.storageUsedGb / device.storageGb) * 100)} />
          </InfoCard>

          <InfoCard title="Rede">
            <InfoRow label="Wi-Fi" value={device.wifiEnabled ? 'Ativado' : 'Desativado'} />
            <InfoRow label="Rede" value={device.wifiNetwork} />
            <InfoRow label="Internet" value="Conectada" />
          </InfoCard>

          <InfoCard title="Sessão">
            <InfoRow label="Tempo online" value={formatUptime(device.uptimeSeconds)} />
            <InfoRow label="Última conexão" value={formatRelativeTime(device.lastConnectedAt)} />
            <InfoRow label="Criado" value={new Date(device.createdAt).toLocaleDateString('pt-BR')} />
          </InfoCard>
        </div>
      </div>

      {confirmingTerminate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center">
            <h3 className="text-base font-bold">Encerrar dispositivo?</h3>
            <p className="mt-2 text-sm text-muted">
              O dispositivo será desligado e o estado atual será salvo. Você pode excluí-lo depois, se quiser.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmingTerminate(false)}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold hover:bg-surface-alt"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setConfirmingTerminate(false);
                  runAction('terminate');
                }}
                className="flex-1 rounded-xl bg-danger py-3 text-sm font-bold text-background"
              >
                Encerrar
              </button>
            </div>
            <button
              onClick={handleDelete}
              disabled={busy === 'delete'}
              className="mt-3 text-xs font-semibold text-danger hover:underline"
            >
              Ou excluir permanentemente este dispositivo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GestureButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button className="flex flex-col items-center gap-0.5">
      <span className="text-sm">{icon}</span>
      <span className="text-[9px]">{label}</span>
    </button>
  );
}

function ActionButton({
  label,
  onClick,
  busy,
  disabled,
  tone = 'default',
}: {
  label: string;
  onClick: () => void;
  busy?: boolean;
  disabled?: boolean;
  tone?: 'default' | 'danger';
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || busy}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-40 ${
        tone === 'danger'
          ? 'border-danger/40 text-danger hover:bg-danger/10'
          : 'border-border text-foreground hover:bg-surface-alt'
      }`}
    >
      {busy ? '…' : label}
    </button>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function UsageBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold">{pct}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
