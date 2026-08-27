import { CloudDevice, Plan, Region } from '../types';

export const mockDevices: CloudDevice[] = [
  {
    id: 'dev-1',
    name: 'Meu Celular Nuvem 1',
    androidVersion: 'Android 13',
    region: 'São Paulo, BR',
    status: 'running',
    latencyMs: 18,
    storageUsedGb: 34,
    storageTotalGb: 128,
    autoPlayEnabled: false,
    minutesRemaining: 452,
    thumbnailColor: '#5B8CFF',
  },
  {
    id: 'dev-2',
    name: 'Farm de Jogos',
    androidVersion: 'Android 13',
    region: 'Frankfurt, DE',
    status: 'auto-play',
    latencyMs: 26,
    storageUsedGb: 98,
    storageTotalGb: 128,
    autoPlayEnabled: true,
    minutesRemaining: 1290,
    thumbnailColor: '#33E0C2',
  },
  {
    id: 'dev-3',
    name: 'Dispositivo Reserva',
    androidVersion: 'Android 12',
    region: 'Singapura, SG',
    status: 'stopped',
    latencyMs: 0,
    storageUsedGb: 12,
    storageTotalGb: 64,
    autoPlayEnabled: false,
    minutesRemaining: 60,
    thumbnailColor: '#FFB84D',
  },
];

export const mockRegions: Region[] = [
  { id: 'sp', name: 'São Paulo', country: 'Brasil', pingMs: 18 },
  { id: 'us', name: 'Virginia', country: 'EUA', pingMs: 112 },
  { id: 'de', name: 'Frankfurt', country: 'Alemanha', pingMs: 187 },
  { id: 'sg', name: 'Singapura', country: 'Singapura', pingMs: 231 },
  { id: 'jp', name: 'Tóquio', country: 'Japão', pingMs: 245 },
];

export const mockPlans: Plan[] = [
  {
    id: 'plan-hourly',
    cycle: 'hourly',
    title: 'Pacote por Hora',
    price: 'R$ 1,90',
    priceSuffix: '/ hora',
    highlight: 'Pague só pelo que usar',
    features: [
      'Cobrado apenas quando o dispositivo está ligado',
      'Sem cobrança ao desligar o Cloud Phone',
      'Ideal para uso esporádico',
    ],
  },
  {
    id: 'plan-monthly',
    cycle: 'monthly',
    title: 'Assinatura Mensal',
    price: 'R$ 79,90',
    priceSuffix: '/ mês',
    highlight: 'Melhor custo-benefício',
    popular: true,
    features: [
      'Uso ilimitado dentro do mês',
      'Auto-play 24/7 incluso',
      'Múltiplos dispositivos simultâneos',
      'Suporte prioritário',
    ],
  },
  {
    id: 'plan-yearly',
    cycle: 'yearly',
    title: 'Assinatura Anual',
    price: 'R$ 699,90',
    priceSuffix: '/ ano',
    highlight: 'Economize 27%',
    features: [
      'Tudo do plano mensal',
      '2 meses grátis',
      'Prioridade em novos data centers',
    ],
  },
];

export const freeTrialDaysAvailable = 1;
