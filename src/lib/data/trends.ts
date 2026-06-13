import type { InstagramPost, YouTubeVideo, NewsArticle, TrendKeyword } from '@/lib/types';

/**
 * 외부 API 키가 없을 때 즉시 UI를 확인할 수 있도록 하는 Mock 데이터.
 * (실제 키가 .env.local 에 있으면 trends-service 가 실데이터로 대체)
 */

export const mockInstagram: InstagramPost[] = [
  { id: 'ig1', caption: '#오로라젤리미스트 결정리 끝판왕 ✨ 물광 미스트', permalink: 'https://instagram.com', likes: 3120, gradient: 'from-assi-lavender to-assi-pink' },
  { id: 'ig2', caption: '비건 뷰티 데일리 루틴 공유 🌿 #보태니컬', permalink: 'https://instagram.com', likes: 2480, gradient: 'from-assi-pink to-assi-yellow' },
  { id: 'ig3', caption: '업사이클링 공병으로 다시 채우기 ♻️ 지속가능 뷰티', permalink: 'https://instagram.com', likes: 1890, gradient: 'from-emerald-100 to-assi-lavender' },
  { id: 'ig4', caption: '데일리 글래스 스킨 메이크업 💜 오로라 광채', permalink: 'https://instagram.com', likes: 4015, gradient: 'from-purple-200 to-assi-pink' },
];

export const mockYouTube: YouTubeVideo[] = [
  { id: 'yt1', title: '[성분 분석] 젤리 제형 미스트, 진짜 수분감 테스트', channelTitle: '뷰티랩 코리아', url: 'https://youtube.com', views: '조회수 18만회', gradient: 'from-assi-pink to-assi-lavender' },
  { id: 'yt2', title: '2030 데일리 글로우 메이크업 루틴 GRWM', channelTitle: "MINI's Vlog", url: 'https://youtube.com', views: '조회수 9.4만회', gradient: 'from-assi-yellow to-assi-pink' },
  { id: 'yt3', title: '비건 화장품 6종 솔직 리뷰 (내돈내산)', channelTitle: 'CleanBeauty', url: 'https://youtube.com', views: '조회수 5.1만회', gradient: 'from-assi-lavender to-purple-200' },
];

export const mockNews: NewsArticle[] = [
  { id: 'nw1', title: 'K-뷰티, 업사이클링 패키지로 글로벌 친환경 시장 정조준', source: '뷰티경제', url: 'https://news.google.com', publishedAt: '2시간 전', gradient: 'from-emerald-100 to-assi-lavender' },
  { id: 'nw2', title: '"젤리·푸딩 제형이 뜬다" 2030 겨냥한 텍스처 마케팅', source: '코스인', url: 'https://news.google.com', publishedAt: '5시간 전', gradient: 'from-assi-pink to-assi-yellow' },
  { id: 'nw3', title: '보태니컬 성분 화장품 수요 1년 새 32% 증가', source: '데일리코스메틱', url: 'https://news.google.com', publishedAt: '어제', gradient: 'from-assi-lavender to-assi-pink' },
];

export const mockKeywords: TrendKeyword[] = [
  { rank: 1, keyword: '젤리 미스트', delta: 128 },
  { rank: 2, keyword: '비건 스킨케어', delta: 64 },
  { rank: 3, keyword: '업사이클링 화장품', delta: 41 },
  { rank: 4, keyword: '글래스 스킨', delta: 27 },
  { rank: 5, keyword: '병풀 추출물', delta: 19 },
];
