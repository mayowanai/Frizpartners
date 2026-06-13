import Link from 'next/link';
import { Sparkles, Instagram, Youtube, Leaf, Recycle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-24 px-4 pb-10">
      <div className="glass-card mx-auto max-w-6xl px-6 py-12 md:px-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-assi-ink text-white">
                <Sparkles size={18} />
              </span>
              <span className="font-display text-lg font-bold text-assi-ink">ASSI from Korea</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-assi-ink/70">
              보태니컬 자연 성분과 업사이클링 패키지로 완성하는 지속 가능한 시크함. 매일의 루틴에
              신비로운 오로라를 더합니다.
            </p>
            <div className="mt-5 flex gap-3">
              <span className="glass-pill inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-assi-grape">
                <Leaf size={13} /> Botanical
              </span>
              <span className="glass-pill inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-assi-grape">
                <Recycle size={13} /> Upcycled
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-assi-ink">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-assi-ink/70">
              <li><Link href="/about" className="hover:text-assi-grape">회사소개</Link></li>
              <li><Link href="/shop" className="hover:text-assi-grape">브랜드 &amp; 제품</Link></li>
              <li><Link href="/event" className="hover:text-assi-grape">이벤트</Link></li>
              <li><Link href="/beauty-trend" className="hover:text-assi-grape">뷰티 트렌드</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-assi-ink">Follow</h4>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/50 text-assi-ink hover:bg-white/80"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/50 text-assi-ink hover:bg-white/80"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/40 pt-6 text-xs text-assi-ink/50">
          © {new Date().getFullYear()} ASSI from Korea. All rights reserved. · Sustainable Beauty,
          Chic &amp; Mysterious.
        </div>
      </div>
    </footer>
  );
}
