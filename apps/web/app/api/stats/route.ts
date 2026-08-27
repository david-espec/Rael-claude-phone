import { NextResponse } from 'next/server';
import { getInfraStats } from '@/lib/store';

export async function GET() {
  return NextResponse.json({ stats: getInfraStats() });
}
