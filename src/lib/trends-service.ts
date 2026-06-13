import type { InstagramPost, YouTubeVideo, NewsArticle, TrendKeyword } from '@/lib/types';
import { mockInstagram, mockYouTube, mockNews, mockKeywords } from '@/lib/data/trends';

/**
 * 트렌드 서비스 레이어
 * - Route Handler(/api/trends/*) 가 이 함수들을 호출해 외부 API를 Fetch합니다.
 * - 환경변수(API 키)가 없거나 호출이 실패하면 Mock 데이터로 자동 폴백합니다.
 */

const GRADIENTS = [
  'from-assi-lavender to-assi-pink',
  'from-assi-pink to-assi-yellow',
  'from-purple-200 to-assi-pink',
  'from-emerald-100 to-assi-lavender',
];
const pickGradient = (i: number): string => GRADIENTS[i % GRADIENTS.length];

const REVALIDATE = 3600; // 1시간 ISR 캐시

/** Instagram Basic Display API — GET /me/media */
export async function getInstagramFeed(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return mockInstagram;

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,permalink,like_count&access_token=${token}&limit=8`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(`Instagram API ${res.status}`);

    const json = (await res.json()) as {
      data?: Array<{ id: string; caption?: string; permalink: string; like_count?: number }>;
    };
    return (json.data ?? []).map((d, i): InstagramPost => ({
      id: d.id,
      caption: d.caption ?? 'ASSI from Korea',
      permalink: d.permalink,
      likes: d.like_count ?? 0,
      gradient: pickGradient(i),
    }));
  } catch (err) {
    console.error('[trends] Instagram → mock fallback:', err);
    return mockInstagram;
  }
}

/** YouTube 제목의 HTML 엔티티 디코딩 (&amp; 등) */
const decodeHtml = (s: string): string =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

/** YouTube Data API v3 — 키워드 검색으로 인기 뷰티 영상 수집 */
export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return mockYouTube;

  const query = process.env.YOUTUBE_SEARCH_QUERY ?? 'K뷰티 신상 리뷰';
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/search?key=${key}` +
      `&q=${encodeURIComponent(query)}&part=snippet&type=video&order=viewCount` +
      `&maxResults=6&regionCode=KR&relevanceLanguage=ko`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);

    const json = (await res.json()) as {
      items?: Array<{
        id: { videoId: string };
        snippet: {
          title: string;
          channelTitle: string;
          thumbnails?: { medium?: { url: string }; high?: { url: string } };
        };
      }>;
    };
    return (json.items ?? []).map((it, i): YouTubeVideo => ({
      id: it.id.videoId,
      title: decodeHtml(it.snippet.title),
      channelTitle: it.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${it.id.videoId}`,
      views: 'YouTube에서 보기',
      thumbnail: it.snippet.thumbnails?.high?.url ?? it.snippet.thumbnails?.medium?.url,
      gradient: pickGradient(i),
    }));
  } catch (err) {
    console.error('[trends] YouTube → mock fallback:', err);
    return mockYouTube;
  }
}

/** 뉴스 / 구글 트렌드 RSS 피드 파싱 */
export async function getNews(): Promise<NewsArticle[]> {
  const rss = process.env.NEWS_RSS_URL;
  if (!rss) return mockNews;

  try {
    const res = await fetch(rss, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(`RSS ${res.status}`);

    const xml = await res.text();
    const blocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6);
    const pick = (block: string, tag: string): string => {
      const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
    };

    return blocks.map((m, i): NewsArticle => {
      const block = m[1];
      return {
        id: `rss-${i}`,
        title: pick(block, 'title'),
        source: pick(block, 'source') || '뉴스',
        url: pick(block, 'link'),
        publishedAt: pick(block, 'pubDate').slice(0, 16) || '최근',
        gradient: pickGradient(i),
      };
    });
  } catch (err) {
    console.error('[trends] News RSS → mock fallback:', err);
    return mockNews;
  }
}

/** 구글 트렌드(비공식) 연동 지점 — 현재는 큐레이션 Mock */
export function getTrendKeywords(): TrendKeyword[] {
  return mockKeywords;
}
