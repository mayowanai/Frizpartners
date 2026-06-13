import Link from 'next/link';
import { Leaf, Recycle, Sparkles, ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import FadeInSection from '@/components/ui/FadeInSection';
import GlassCard from '@/components/ui/GlassCard';

const PILLARS = [
  {
    icon: Leaf,
    title: '보태니컬 베이스',
    desc: '피부에 친화적인 식물 유래 성분으로 매일의 순한 루틴을 완성합니다.',
  },
  {
    icon: Recycle,
    title: '업사이클링 패키지',
    desc: '버려질 자원을 다시 디자인한 친환경 용기로 지속 가능한 아름다움을 실천합니다.',
  },
  {
    icon: Sparkles,
    title: '시크 & 미스터리',
    desc: '파스텔 오로라 위에 얹은 신비로운 무드, 합리적인 가격의 프리미엄 감성.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Brand pillars */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <FadeInSection className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-assi-ink md:text-4xl">
              지속 가능한 시크함
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-assi-ink/70">
              ASSI는 자연과 디자인, 그리고 합리적인 가격의 균형을 추구합니다.
            </p>
          </FadeInSection>

          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <FadeInSection key={title} delay={i * 0.1}>
                <GlassCard className="h-full p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-assi-ink text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-assi-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-assi-ink/70">{desc}</p>
                </GlassCard>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-10">
        <FadeInSection className="mx-auto max-w-6xl">
          <GlassCard className="relative overflow-hidden p-10 md:p-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-aurora opacity-40 blur-3xl" />
            <div className="relative max-w-lg">
              <h2 className="font-display text-3xl font-bold text-assi-ink md:text-4xl">
                오늘의 피부에 오로라를 더하다
              </h2>
              <p className="mt-4 text-assi-ink/70">
                시그니처 오로라 젤리 미스트와 함께 신비로운 광채 루틴을 시작하세요.
              </p>
              <Link href="/shop" className="btn-primary group mt-8">
                제품 보러가기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </GlassCard>
        </FadeInSection>
      </section>
    </>
  );
}
