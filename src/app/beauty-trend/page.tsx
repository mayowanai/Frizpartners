import type { ReactNode } from 'react';
import Image from 'next/image';
import { Instagram, Youtube, Newspaper, TrendingUp, ArrowUpRight, Heart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { getInstagramFeed, getYouTubeVideos, getNews, getTrendKeywords } from '@/lib/trends-service';

// ISR: 1시간마다 정적 재생성
export const revalidate = 3600;

export default async function BeautyTrendPage() {
  // 서비스 레이어 직접 호출 (Route Handler /api/trends/* 와 동일 함수).
  // 키가 있으면 외부 API 실데이터, 없으면 Mock 폴백. 빌드 시점에도 실데이터로 정적 생성됨.
  const [instagram, youtube, news] = await Promise.all([
    getInstagramFeed(),
    getYouTubeVideos(),
    getNews(),
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
                <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${v.gradient}`}>
                  {v.thumbnail ? (
                    <Image
                      src={v.thumbnail}
                      alt={v.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-glass-sheen opacity-50" />
                  )}
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
