'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DownloadModal } from '@/components/DownloadModal';
import { InfiniteBattery } from '@/components/InfiniteBattery';
import { withBasePath } from '@/lib/basePath';

const features = [
  {
    icon: '🎮',
    title: 'Roblox farmando 24/7, mesmo offline',
    text: 'Ative o auto-play e deixe seu Roblox rendendo sozinho — Robux, eventos, passes e grind continuam mesmo com você offline ou dormindo.',
  },
  {
    icon: '📱',
    title: 'Android e iPhone de verdade',
    text: 'Crie um Galaxy S26 Ultra ou um iPhone 17 Pro Max virtual, com o Roblox instalado e o sistema operacional original rodando na nuvem.',
  },
  {
    icon: '🔋',
    title: 'Bateria infinita',
    text: 'Seus dispositivos ficam sempre ligados no carregador, 24 horas por dia, 7 dias por semana — sem nunca descarregar.',
  },
  {
    icon: '☁️',
    title: '24/7 e persistente',
    text: 'Feche o navegador quando quiser: o dispositivo continua rodando, com apps abertos e dados salvos, até você encerrar.',
  },
  {
    icon: '🧩',
    title: 'Multidispositivo',
    text: 'Farme Roblox em várias contas ao mesmo tempo, cada dispositivo isolado, com armazenamento, rede e apps próprios.',
  },
  {
    icon: '⚡',
    title: 'Streaming de baixa latência',
    text: 'A tela do dispositivo é transmitida em tempo real; toque, arraste e digite como em um aparelho físico.',
  },
  {
    icon: '🛠️',
    title: 'Recuperação automática',
    text: 'Um watchdog monitora cada dispositivo 24/7 e reinicia automaticamente em caso de falha.',
  },
];

export default function Home() {
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Image
            src={withBasePath('/icons/icon-192.png')}
            alt="Rael Cloud Phone"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-sm font-bold tracking-tight">Rael Cloud Phone</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden text-sm font-medium text-muted hover:text-foreground sm:block">
            Meus dispositivos
          </Link>
          <button
            onClick={() => setDownloadOpen(true)}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background transition hover:bg-primary-dark"
          >
            Baixar app
          </button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center">
          <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-accent">
            🎮 Feito pra farmar Roblox 24/7
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Seu Roblox rodando na nuvem, <span className="text-primary">24 horas por dia</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Crie dispositivos Android ou iPhone virtuais com Roblox instalado e deixe farmando sozinho — mesmo
            com você offline — sem ocupar memória nem gastar bateria do seu aparelho físico.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background transition hover:bg-primary-dark"
            >
              Criar meu dispositivo pra Roblox
            </Link>
            <button
              onClick={() => setDownloadOpen(true)}
              className="rounded-xl border border-border px-6 py-3 text-sm font-bold text-foreground transition hover:bg-surface"
            >
              Baixar app
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
            <InfiniteBattery compact />
            <span className="text-xs font-semibold text-muted">
              Bateria infinita · sempre conectado ao carregador na nuvem
            </span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-2xl">{feature.icon}</div>
                <h3 className="mt-3 text-sm font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-surface p-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold">Pronto pra deixar o Roblox rendendo sozinho?</h2>
              <p className="mt-2 max-w-md text-sm text-muted">
                Adicione o Rael Cloud Phone à tela inicial do seu dispositivo e acesse seus celulares na nuvem em
                um toque.
              </p>
            </div>
            <button
              onClick={() => setDownloadOpen(true)}
              className="whitespace-nowrap rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background transition hover:bg-primary-dark"
            >
              Baixar app agora
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-xs text-faint">
        Rael Cloud Phone · dispositivos simulados para fins de demonstração
      </footer>

      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </div>
  );
}
