'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { deviceCatalog } from '@/lib/catalog';
import { Platform } from '@/lib/types';

type Step = 1 | 2 | 3;

export default function NewDevicePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [configId, setConfigId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const model = useMemo(() => deviceCatalog.find((m) => m.platform === platform) ?? null, [platform]);

  function selectPlatform(p: Platform) {
    setPlatform(p);
    setConfigId(null);
    setStep(2);
  }

  function selectConfig(id: string) {
    setConfigId(id);
    setStep(3);
  }

  async function handleCreate() {
    if (!platform || !model || !configId) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, modelId: model.id, configId, name: name || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao criar dispositivo');
      router.push(`/dashboard/devices/${data.device.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar dispositivo');
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold">Criar dispositivo</h1>
        <p className="mt-1 text-sm text-muted">Configure seu novo celular na nuvem em poucos passos.</p>
      </div>

      <StepIndicator step={step} />

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <PlatformCard
            icon="🤖"
            title="Android"
            subtitle="Samsung Galaxy S26 Ultra · Android 16"
            onClick={() => selectPlatform('android')}
          />
          <PlatformCard
            icon="🍎"
            title="iOS"
            subtitle="Apple iPhone 17 Pro Max · iOS 26"
            onClick={() => selectPlatform('ios')}
          />
        </div>
      )}

      {step === 2 && model && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs font-semibold text-muted">Modelo selecionado</p>
            <p className="mt-1 text-lg font-bold">{model.name}</p>
            <p className="text-sm text-muted">
              {model.osVersion} · {model.hardware}
            </p>
          </div>

          <p className="text-sm font-semibold text-muted">Escolha a configuração</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {model.configs.map((config) => (
              <button
                key={config.id}
                onClick={() => selectConfig(config.id)}
                className="rounded-2xl border border-border bg-surface p-5 text-left transition hover:border-primary/60"
              >
                <p className="text-lg font-extrabold">
                  {config.storageGb >= 1024 ? `${config.storageGb / 1024} TB` : `${config.storageGb} GB`}
                </p>
                <p className="text-sm text-muted">{config.ramGb} GB RAM</p>
              </button>
            ))}
          </div>

          <button onClick={() => setStep(1)} className="self-start text-xs font-semibold text-muted hover:text-foreground">
            ← Voltar
          </button>
        </div>
      )}

      {step === 3 && model && configId && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs font-semibold text-muted">Resumo</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted">Sistema</span>
                <span className="font-semibold">{model.osVersion}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Modelo</span>
                <span className="font-semibold">{model.name}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Configuração</span>
                <span className="font-semibold">
                  {(() => {
                    const c = model.configs.find((c) => c.id === configId)!;
                    return `${c.storageGb >= 1024 ? `${c.storageGb / 1024} TB` : `${c.storageGb} GB`} / ${c.ramGb} GB RAM`;
                  })()}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Bateria</span>
                <span className="font-semibold text-accent">∞ infinita (sempre carregando)</span>
              </li>
            </ul>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-muted">Nome do dispositivo (opcional)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`${model.name} #0${1}`}
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>

          {error && <p className="text-sm text-danger">{error}</p>}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-surface">
              ← Voltar
            </button>
            <button
              onClick={handleCreate}
              disabled={submitting}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-background transition hover:bg-primary-dark disabled:opacity-60"
            >
              {submitting ? 'Criando dispositivo…' : 'Criar dispositivo'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const labels = ['Sistema', 'Configuração', 'Confirmação'];
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, index) => {
        const n = (index + 1) as Step;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                active ? 'bg-primary text-background' : done ? 'bg-accent text-background' : 'bg-surface-alt text-muted'
              }`}
            >
              {done ? '✓' : n}
            </div>
            <span className={`text-xs font-semibold ${active ? 'text-foreground' : 'text-muted'}`}>{label}</span>
            {index < labels.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

function PlatformCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-6 text-left transition hover:border-primary/60"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
    </button>
  );
}
