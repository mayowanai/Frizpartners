import { Leaf, Recycle, Sparkles, FlaskConical } from 'lucide-react';
import FadeInSection from '@/components/ui/FadeInSection';
import GlassCard from '@/components/ui/GlassCard';

const STORY = [
  {
    icon: Sparkles,
    eyebrow: 'OUR MOOD',
    title: '시크하고 신비로운, 그러나 다정한',
    body: 'ASSI from Korea는 트렌드에 민감한 2030을 위한 브랜드입니다. 파스텔 오로라의 몽환적인 무드 위에 군더더기 없는 시크함을 더했습니다. 합리적인 가격 안에서도 압도적으로 세련된 경험을 약속합니다.',
  },
  {
    icon: Leaf,
    eyebrow: 'BOTANICAL',
    title: '피부에 건네는 자연의 언어',
    body: '병풀, 어성초, 카모마일 등 피부 친화적인 보태니컬 성분을 베이스로 합니다. 자극은 덜고 수분은 채우는, 매일 써도 부담 없는 순한 처방을 지향합니다.',
  },
  {
    icon: Recycle,
    eyebrow: 'SUSTAINABLE',
    title: '다시 태어난 용기, 업사이클링',
    body: '버려질 자원을 다시 디자인했습니다. 업사이클링 패키지와 공병 리워드 캠페인으로, 아름다움이 지구에 남기는 흔적을 줄여갑니다.',
  },
  {
    icon: FlaskConical,
    eyebrow: 'SIGNATURE',
    title: '오로라 젤리 미스트',
    body: '한 번쯤 써보고 싶게 만드는 몽글몽글한 젤리 제형. 시각적 매력과 즉각적인 수분 광채를 동시에 담은, ASSI의 시그니처입니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 pb-10 pt-32">
      <section className="mx-auto max-w-4xl">
        <FadeInSection className="text-center">
          <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
            <Sparkles size={14} /> ABOUT ASSI
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-assi-ink md:text-6xl">
            Chic &amp; Mysterious
            <br />
            <span className="aurora-text">Sustainable Beauty</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-assi-ink/70">
            자연을 담되 세련됨을 잃지 않는, 지속 가능한 시크함을 이야기합니다.
          </p>
        </FadeInSection>

        <div className="mt-20 space-y-8">
          {STORY.map(({ icon: Icon, eyebrow, title, body }, i) => (
            <FadeInSection key={eyebrow} delay={i * 0.05}>
              <GlassCard className="grid gap-6 p-8 md:grid-cols-[auto_1fr] md:p-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-assi-ink text-white">
                  <Icon size={24} />
                </span>
                <div>
                  <span className="font-display text-xs font-semibold tracking-widest text-assi-plum">
                    {eyebrow}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-assi-ink">{title}</h2>
                  <p className="mt-3 leading-relaxed text-assi-ink/75">{body}</p>
                </div>
              </GlassCard>
            </FadeInSection>
          ))}
        </div>
      </section>
    </div>
  );
}
