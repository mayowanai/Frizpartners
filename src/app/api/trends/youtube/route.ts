import { NextResponse } from 'next/server';
import { getYouTubeVideos } from '@/lib/trends-service';

export const revalidate = 3600;

/**
 * GET /api/trends/youtube
 * YouTube Data API v3를 백엔드에서 Fetch → 프론트로 전달.
 */
export async function GET() {
  const data = await getYouTubeVideos();
  return NextResponse.json({ data });
}
