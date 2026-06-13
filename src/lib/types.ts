// ─────────────────────────────────────────────
//  ASSI from Korea — 공용 타입 정의
// ─────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  /** 핵심 자연 성분 태그 (Badge) */
  badges: string[];
  /** 카드 비주얼용 Tailwind 그라데이션 클래스 */
  gradient: string;
  signature?: boolean;
}

export interface EventPost {
  id: string;
  title: string;
  description: string;
  period: string;
  tag: string;
  /** Masonry 높이 변주 */
  span: 'short' | 'tall';
  gradient: string;
}

export type TrendPlatform = 'instagram' | 'youtube' | 'news' | 'google';

export interface InstagramPost {
  id: string;
  caption: string;
  permalink: string;
  likes: number;
  gradient: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  url: string;
  views: string;
  /** 실 API 연동 시 YouTube 썸네일 URL (mock 은 gradient 로 대체) */
  thumbnail?: string;
  gradient: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  gradient: string;
}

export interface TrendKeyword {
  rank: number;
  keyword: string;
  /** 상승 폭(%) */
  delta: number;
}
