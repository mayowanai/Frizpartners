import type { ReactNode } from 'react';
import { Instagram, Youtube, Newspaper, TrendingUp, ArrowUpRight, Heart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { getTrendKeywords } from '@/lib/trends-service';
import { mockInstagram, mockYouTube, mockNews } from '@/lib/data/trends';
import type { InstagramPost, YouTubeVideo, NewsArticle } from '@/lib/types';

// ISR: 1시간마다 정적 재생성
export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

/**
 * Route Handler(/api/trends/*)를 호출해 데이터를 받아옵니다.
 * 빌드/오프라인 등으로 self-fetch가 실패하면 Mock 데이터로 폴백하여 항상 렌더링됩니다.
 */
async function fetchTrend<T>(path: string, fallback: T): Promise<T> {
  // 프로덕션 빌드(정적 프리렌더) 단계에는 자체 서버가 없으므로 Mock으로 정적 생성하고,
  // 런타임 요청 / ISR 재검증 시 Route Handler에서 실데이터를 받아옵니다.
  if (process.env.NEXT_PHASE === 'phase-production-build') return fallback;
  try {
    const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate } });
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    const json = (await res.json()) as { data: T };
    return json.data;
  } catch (err) {
    console.warn('[beauty-trend] Route Handler 호출 실패 → Mock 폴백:', (err as Error).message);
    return fallback;
  }
}

export default async function BeautyTrendPage() {
  // ✅ 백엔드(Route Handler)가 외부 API를 Fetch → 프론트로 전달하는 아키텍처
  const [instagram, youtube, news] = await Promise.all([
    fetchTrend<InstagramPost[]>('/api/trends/instagram', mockInstagram),
    fetchTrend<YouTubeVideo[]>('/api/trends/youtube', mockYouTube),
    fetchTrend<NewsArticle[]>('/api/trends/news', mockNews),
  ]);
  const keywords = getTrendKeywords();

  return (
    <div className="px-4 pb-10 pt-32">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
            <TrendingUp size={14} /> BEAUTY TREND HUB
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-assi-ink md:text-5xl">
            지금, 뷰티 트렌드
          </h1>
          <p className="mt-4 text-assi-ink/70">
            인스타그램 · 유튜브 · 뉴스를 한곳에서. ASSI가 큐레이션하는 보태니컬 &amp; 비건 뷰티 흐름.
          </p>
        </div>

        {/* 실시간 인기 키워드 (구글 트렌드 연동 지점) */}
        <GlassCard className="mt-10 p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-assi-ink">
            <TrendingUp size={16} className="text-assi-plum" /> 실시간 인기 키워드
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {keywords.map((k) => (
              <span
                key={k.rank}
                className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-sm text-assi-ink"
              >
                <span className="font-display text-assi-plum">{k.rank}</span>
                {k.keyword}
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
                  <ArrowUpRight size={12} /> {k.delta}%
                </span>
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Instagram */}
        <TrendSection title="Instagram" subtitle="#ASSI 해시태그 피드" icon={<Instagram size={18} />}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {instagram.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card overflow-hidden"
              >
                <div className={`relative aspect-square bg-gradient-to-br ${post.gradient}`}>
                  <div className="absolute inset-0 bg-glass-sheen opacity-60" />
                  <Instagram className="absolute right-3 top-3 text-white/80" size={18} />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-xs text-assi-ink/80">{post.caption}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-pink-500">
                    <Heart size={11} /> {post.likes.toLocaleString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </TrendSection>

        {/* YouTube */}
        <TrendSection title="YouTube" subtitle="리뷰 &amp; 루틴 영상" icon={<Youtube size={18} />}>
          <div className="grid gap-4 md:grid-cols-3">
            {youtube.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card overflow-hidden"
              >
                <div className={`relative aspect-video bg-gradient-to-br ${v.gradient}`}>
                  <div className="absolute inset-0 bg-glass-sheen opacity-50" />
                  <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-assi-grape backdrop-blur-md transition-transform group-hover:scale-110">
                    <Youtube size={20} />
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-medium text-assi-ink">{v.title}</h3>
                  <p className="mt-2 text-xs text-assi-ink/60">
                    {v.channelTitle} · {v.views}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </TrendSection>

        {/* News & Google Trends */}
        <TrendSection
          title="News & Google Trends"
          subtitle="업계 뉴스와 검색 트렌드"
          icon={<Newspaper size={18} />}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {news.map((n) => (
              <a
                key={n.id}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card flex flex-col overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${n.gradient}`} />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-assi-ink">
                    {n.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-assi-ink/55">
                    <span>
                      {n.source} · {n.publishedAt}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </TrendSection>
      </section>
    </div>
  );
}

function TrendSection({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-assi-ink text-white">
            {icon}
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-assi-ink">{title}</h2>
            <p className="text-xs text-assi-ink/55">{subtitle}</p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
