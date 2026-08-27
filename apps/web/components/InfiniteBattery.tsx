export function InfiniteBattery({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-accent"
      title="Bateria infinita — o dispositivo permanece sempre conectado à energia na nuvem"
    >
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="16" height="11" rx="2.5" stroke="currentColor" />
        <rect x="17.5" y="4" width="2" height="4" rx="1" fill="currentColor" />
        <path d="M9.5 2L6 6.5H9L8 10L12 5.2H9L9.5 2Z" fill="currentColor" />
      </svg>
      {!compact && <span className="text-[11px] font-semibold">∞ sempre carregando</span>}
    </span>
  );
}
