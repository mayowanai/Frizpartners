import { NextResponse } from 'next/server';
import { getNews } from '@/lib/trends-service';

export const revalidate = 3600;

/**
 * GET /api/trends/news
 * 뉴스/구글 트렌드 RSS 피드를 백엔드에서 Fetch·파싱 → 프론트로 전달.
 */
export async function GET() {
  const data = await getNews();
  return NextResponse.json({ data });
}
