import { NextRequest, NextResponse } from 'next/server';
import { deleteDevice, duplicateDevice, getDevice, updateDevice } from '@/lib/store';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const device = getDevice(id);
  if (!device) return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 });
  return NextResponse.json({ device });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const action = body.action as string | undefined;

  if (action === 'duplicate') {
    const created = duplicateDevice(id);
    if (!created) return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 });
    return NextResponse.json({ device: created }, { status: 201 });
  }

  let patch: Parameters<typeof updateDevice>[1] = {};
  const now = new Date().toISOString();

  switch (action) {
    case 'restart':
      patch = { status: 'starting', lastConnectedAt: now };
      break;
    case 'shutdown':
      patch = { status: 'offline', autoPlayEnabled: false, autoPlaySince: null };
      break;
    case 'terminate':
      patch = { status: 'terminated', autoPlayEnabled: false, autoPlaySince: null };
      break;
    case 'open':
      patch = { status: 'online', lastConnectedAt: now };
      break;
    case 'rename':
      if (typeof body.name !== 'string' || !body.name.trim()) {
        return NextResponse.json({ error: 'Nome inválido' }, { status: 400 });
      }
      patch = { name: body.name.trim() };
      break;
    case 'autoplay': {
      const enabled = Boolean(body.enabled);
      if (enabled) {
        const game = typeof body.game === 'string' ? body.game.trim() : '';
        if (!game) return NextResponse.json({ error: 'Informe o jogo para farmar' }, { status: 400 });
        patch = { autoPlayEnabled: true, autoPlayGame: game, autoPlaySince: now, status: 'online', lastConnectedAt: now };
      } else {
        patch = { autoPlayEnabled: false, autoPlaySince: null };
      }
      break;
    }
    default:
      return NextResponse.json({ error: 'Ação desconhecida' }, { status: 400 });
  }

  const device = updateDevice(id, patch);
  if (!device) return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 });
  return NextResponse.json({ device });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const ok = deleteDevice(id);
  if (!ok) return NextResponse.json({ error: 'Dispositivo não encontrado' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
