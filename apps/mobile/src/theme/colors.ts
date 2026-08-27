export const colors = {
  background: '#0B0F1A',
  surface: '#141A2A',
  surfaceAlt: '#1C2438',
  border: '#2A3350',
  primary: '#5B8CFF',
  primaryDark: '#3E63D6',
  accent: '#33E0C2',
  success: '#33E0C2',
  warning: '#FFB84D',
  danger: '#FF6B6B',
  text: '#F5F7FF',
  textMuted: '#8B93B0',
  textFaint: '#5A6280',
};

export const statusColor = {
  running: colors.success,
  'auto-play': colors.primary,
  stopped: colors.textFaint,
  starting: colors.warning,
} as const;

export const statusLabel = {
  running: 'Em execução',
  'auto-play': 'Auto-play 24/7',
  stopped: 'Desligado',
  starting: 'Iniciando…',
} as const;
