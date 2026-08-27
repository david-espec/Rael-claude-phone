import { DeviceStatus, statusMeta } from '@/lib/types';

export function StatusBadge({ status }: { status: DeviceStatus }) {
  const meta = statusMeta[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
      style={{ borderColor: `${meta.color}55`, backgroundColor: `${meta.color}1a`, color: meta.color }}
    >
      <span>{meta.dot}</span>
      {meta.label}
    </span>
  );
}
