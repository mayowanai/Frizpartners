import type { InstagramPost, YouTubeVideo, NewsArticle, TrendKeyword } from '@/lib/types';

/**
 * 데모(폴백) 데이터.
 * - 카드 링크는 실제 관련 해시태그/검색 결과로 연결됩니다 (클릭 시 진짜 콘텐츠 노출).
 * - API 키가 설정되면 trends-service 가 실데이터로 자동 대체합니다.
 */

const ig = (tag: string) => `https://www.instagram.com/explore/tags/${encodeURIComponent(tag)}/`;
const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const news = (q: string) =>
  `https://news.google.com/search?q=${encodeURIComponent(q)}&hl=ko&gl=KR&ceid=KR:ko`;

export const mockInstagram: InstagramPost[] = [
  { id: 'ig1', caption: '#물광미스트 결정리 끝판왕 ✨ 젤리 수분 미스트', permalink: ig('물광미스트'), likes: 3120, gradient: 'from-assi-lavender to-assi-pink' },
  { id: 'ig2', caption: '비건 뷰티 데일리 루틴 공유 🌿 #비건뷰티', permalink: ig('비건뷰티'), likes: 2480, gradient: 'from-assi-pink to-assi-yellow' },
  { id: 'ig3', caption: '공병 모아 다시 채우기 ♻️ #제로웨이스트', permalink: ig('제로웨이스트'), likes: 1890, gradient: 'from-emerald-100 to-assi-lavender' },
  { id: 'ig4', caption: '데일리 글래스 스킨 메이크업 💜 #글래스스킨', permalink: ig('글래스스킨'), likes: 4015, gradient: 'from-purple-200 to-assi-pink' },
];

export const mockYouTube: YouTubeVideo[] = [
  { id: 'yt1', title: '[성분 분석] 젤리 제형 미스트, 진짜 수분감 테스트', channelTitle: '뷰티랩 코리아', url: yt('젤리 미스트 리뷰'), views: '관련 영상 보기', gradient: 'from-assi-pink to-assi-lavender' },
  { id: 'yt2', title: '2030 데일리 글로우 메이크업 루틴 GRWM', channelTitle: "MINI's Vlog", url: yt('데일리 글로우 메이크업 GRWM'), views: '관련 영상 보기', gradient: 'from-assi-yellow to-assi-pink' },
  { id: 'yt3', title: '비건 화장품 솔직 리뷰 (내돈내산)', channelTitle: 'CleanBeauty', url: yt('비건 화장품 리뷰'), views: '관련 영상 보기', gradient: 'from-assi-lavender to-purple-200' },
];

export const mockNews: NewsArticle[] = [
  { id: 'nw1', title: 'K-뷰티, 업사이클링 패키지로 글로벌 친환경 시장 정조준', source: '뷰티경제', url: news('업사이클링 화장품'), publishedAt: '오늘', gradient: 'from-emerald-100 to-assi-lavender' },
  { id: 'nw2', title: '"젤리·푸딩 제형이 뜬다" 2030 겨냥한 텍스처 마케팅', source: '코스인', url: news('젤리 제형 화장품'), publishedAt: '오늘', gradient: 'from-assi-pink to-assi-yellow' },
  { id: 'nw3', title: '보태니컬 성분 화장품 수요 1년 새 32% 증가', source: '데일리코스메틱', url: news('보태니컬 화장품'), publishedAt: '어제', gradient: 'from-assi-lavender to-assi-pink' },
];

export const mockKeywords: TrendKeyword[] = [
  { rank: 1, keyword: '젤리 미스트', delta: 128 },
  { rank: 2, keyword: '비건 스킨케어', delta: 64 },
  { rank: 3, keyword: '업사이클링 화장품', delta: 41 },
  { rank: 4, keyword: '글래스 스킨', delta: 27 },
  { rank: 5, keyword: '병풀 추출물', delta: 19 },
];
