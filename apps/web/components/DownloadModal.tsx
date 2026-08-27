'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInstallPrompt } from '@/lib/useInstallPrompt';

type Step = 'confirm' | 'installing' | 'done' | 'declined';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export function DownloadModal({ open, onClose }: DownloadModalProps) {
  const [step, setStep] = useState<Step>('confirm');
  const { canPromptNatively, promptInstall } = useInstallPrompt();

  useEffect(() => {
    if (open) setStep('confirm');
  }, [open]);

  if (!open) return null;

  async function handleConfirm() {
    setStep('installing');

    if (canPromptNatively) {
      const outcome = await promptInstall();
      if (outcome === 'accepted') {
        setStep('done');
      } else if (outcome === 'dismissed') {
        setStep('declined');
      } else {
        window.setTimeout(() => setStep('done'), 1600);
      }
      return;
    }

    window.setTimeout(() => setStep('done'), 1600);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-foreground shadow-2xl">
        {step === 'confirm' && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
              <Image src="/icons/icon-192.png" alt="Rael Cloud Phone" width={40} height={40} className="rounded-xl" />
            </div>
            <h2 className="text-center text-lg font-bold">Instalar Rael Cloud Phone</h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted">
              Ao confirmar, vamos adicionar um atalho do Rael Cloud Phone à tela inicial do seu dispositivo, como um
              app normal. Nenhum sistema operacional é instalado no seu aparelho — seus celulares continuam rodando
              inteiramente na nuvem, você só ganha um acesso rápido.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition hover:bg-surface-alt"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-background transition hover:bg-primary-dark"
              >
                Confirmar
              </button>
            </div>
          </>
        )}

        {step === 'installing' && (
          <div className="flex flex-col items-center py-4">
            <div className="relative h-40 w-24 rounded-[20px] border-4 border-surface-alt bg-black overflow-hidden">
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <Image src="/icons/icon-192.png" alt="" width={36} height={36} className="rounded-lg opacity-80" />
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-alt">
                  <div className="h-full rounded-full bg-accent animate-progress-fill" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-muted">Instalando na tela inicial…</p>
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-col items-center py-2 text-center">
            <div className="relative h-40 w-24 rounded-[20px] border-4 border-surface-alt bg-black overflow-hidden">
              <div className="grid h-full w-full grid-cols-3 gap-2 p-3">
                <div className="h-6 w-6 rounded-lg bg-surface-alt" />
                <div className="h-6 w-6 rounded-lg bg-surface-alt" />
                <div className="h-6 w-6 animate-install-pop overflow-hidden rounded-lg">
                  <Image src="/icons/icon-192.png" alt="" width={24} height={24} />
                </div>
                <div className="h-6 w-6 rounded-lg bg-surface-alt" />
                <div className="h-6 w-6 rounded-lg bg-surface-alt" />
                <div className="h-6 w-6 rounded-lg bg-surface-alt" />
              </div>
            </div>
            <h3 className="mt-4 text-base font-bold">App adicionado! 🎉</h3>
            <p className="mt-1 text-sm text-muted">
              O ícone do Rael Cloud Phone já está na tela inicial do seu dispositivo.
            </p>
            <div className="mt-5 flex w-full gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition hover:bg-surface-alt"
              >
                Fechar
              </button>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-semibold text-background transition hover:bg-primary-dark"
              >
                Abrir agora
              </Link>
            </div>
          </div>
        )}

        {step === 'declined' && (
          <div className="flex flex-col items-center py-2 text-center">
            <h3 className="text-base font-bold">Instalação cancelada</h3>
            <p className="mt-2 text-sm text-muted">
              Sem problema. Você pode continuar usando o Rael Cloud Phone direto pelo navegador quando quiser.
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition hover:bg-surface-alt"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
