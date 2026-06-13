'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Droplets, Leaf, Recycle, ArrowRight } from 'lucide-react';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

const BADGES = [
  { icon: Leaf, label: 'Botanical' },
  { icon: Droplets, label: 'Jelly Texture' },
  { icon: Recycle, label: 'Upcycled' },
];

/**
 * 메인 히어로 — 시그니처 '오로라 젤리 미스트'
 * 젤리 제형의 쫀쫀함(animate-jelly) + 오로라 광채 + 부유하는 글래스 오브로 시각화.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-4 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* ── Copy ───────────────────────────────── */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={item}
            className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide text-assi-grape"
          >
            <Sparkles size={14} /> SIGNATURE · 시그니처
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-assi-ink md:text-6xl"
          >
            Aurora
            <br />
            <span className="aurora-text">Jelly Mist</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-assi-ink/70"
          >
            한 방울의 몽글몽글한 젤리가 피부 위에서 부드럽게 번지는 순간. 보태니컬 수분이 만드는
            신비로운 오로라 광채를 경험하세요.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn-primary group">
              지금 만나보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/about" className="btn-ghost">
              성분 이야기
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="glass-pill inline-flex items-center gap-1.5 px-3 py-2 text-xs text-assi-ink/80"
              >
                <Icon size={14} className="text-assi-plum" /> {label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-baseline gap-2">
            <span className="text-xs text-assi-ink/50 line-through">₩32,000</span>
            <span className="font-display text-2xl font-bold text-assi-ink">₩23,900</span>
            <span className="glass-pill px-2.5 py-1 text-[11px] font-semibold text-pink-500">
              25% OFF
            </span>
          </motion.div>
        </motion.div>

        {/* ── Visual: jelly blob ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center md:h-[460px] md:w-[460px]"
        >
          {/* glow halo */}
          <div className="absolute inset-0 rounded-full bg-aurora opacity-60 blur-3xl" />

          {/* main jelly — hover 시 몽글몽글 출렁임 */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="relative grid h-72 w-72 animate-jelly place-items-center bg-gradient-to-br from-assi-lavender via-assi-pink to-assi-yellow shadow-jelly md:h-96 md:w-96"
          >
            {/* glass sheen */}
            <div className="absolute inset-3 rounded-[inherit] bg-glass-sheen" />

            {/* floating droplets */}
            <div className="absolute -right-4 top-10 grid h-16 w-16 animate-float place-items-center rounded-full glass text-assi-grape">
              <Droplets size={26} />
            </div>
            <div className="absolute -left-6 bottom-12 grid h-14 w-14 animate-float-slow place-items-center rounded-full glass text-pink-400">
              <Sparkles size={22} />
            </div>

            <span className="relative font-display text-xl font-semibold tracking-wide text-assi-ink/80">
              Jelly
            </span>
          </motion.div>

          {/* orbiting sparkle */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <span className="absolute left-1/2 top-0 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full glass text-amber-400">
              <Sparkles size={18} />
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-assi-ink/50"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-display tracking-widest">SCROLL</span>
          <span className="h-8 w-px bg-assi-ink/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
