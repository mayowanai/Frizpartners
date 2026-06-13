import { Sparkles } from 'lucide-react';
import { events } from '@/lib/data/events';

export default function EventPage() {
  return (
    <div className="px-4 pb-10 pt-32">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
            <Sparkles size={14} /> EVENT
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-assi-ink md:text-5xl">
            진행 중인 이벤트
          </h1>
          <p className="mt-4 text-assi-ink/70">2030을 위한, ASSI가 준비한 트렌디한 혜택을 만나보세요.</p>
        </div>

        {/* Masonry (CSS columns) */}
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {events.map((e) => (
            <article
              key={e.id}
              className="glass-card mb-6 break-inside-avoid overflow-hidden"
            >
              <div
                className={`relative bg-gradient-to-br ${e.gradient} ${
                  e.span === 'tall' ? 'h-52' : 'h-32'
                }`}
              >
                <div className="absolute inset-0 bg-glass-sheen opacity-50" />
                <span className="glass-pill absolute left-4 top-4 px-3 py-1 text-[11px] font-semibold text-assi-grape">
                  {e.tag}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-display text-lg font-bold text-assi-ink">{e.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-assi-ink/70">{e.description}</p>
                <p className="mt-4 inline-flex rounded-full bg-assi-lavender/60 px-3 py-1 text-xs font-medium text-assi-grape">
                  {e.period}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
