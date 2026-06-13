import { NextResponse } from 'next/server';
import { getInstagramFeed } from '@/lib/trends-service';

// ISR: 1시간마다 재검증
export const revalidate = 3600;

/**
 * GET /api/trends/instagram
 * Instagram Basic Display API를 백엔드에서 Fetch → 프론트로 전달.
 * (키가 없으면 서비스 레이어가 Mock으로 폴백)
 */
export async function GET() {
  const data = await getInstagramFeed();
  return NextResponse.json({ data });
}
