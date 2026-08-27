import { NextRequest, NextResponse } from 'next/server';
import { createDevice, listDevices } from '@/lib/store';
import { Platform } from '@/lib/types';

export async function GET() {
  return NextResponse.json({ devices: listDevices() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const platform = body.platform as Platform;
  const modelId = body.modelId as string;
  const configId = body.configId as string;
  const name = body.name as string | undefined;

  if (platform !== 'android' && platform !== 'ios') {
    return NextResponse.json({ error: 'Plataforma inválida' }, { status: 400 });
  }
  if (!modelId || !configId) {
    return NextResponse.json({ error: 'Modelo e configuração são obrigatórios' }, { status: 400 });
  }

  try {
    const device = createDevice({ platform, modelId, configId, name });
    return NextResponse.json({ device }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar dispositivo';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
