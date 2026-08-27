export function formatUptime(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}min`;
}

export function formatStorage(gb: number): string {
  return gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`;
}

export function formatDurationSince(iso: string): string {
  const totalSeconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  return formatUptime(totalSeconds);
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}
