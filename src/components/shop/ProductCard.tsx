'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';

/**
 * 제품 카드 — 가격 정보 + 핵심 자연 성분 태그(Badge)를 명확히 배치.
 * Hover 시 젤리 제형이 몽글몽글 출렁이는 마이크로 인터랙션.
 */
export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group glass-card flex flex-col overflow-hidden"
    >
      {/* Visual */}
      <div className="relative aspect-square overflow-hidden">
        <motion.div
          className={`absolute inset-6 bg-gradient-to-br ${product.gradient} shadow-jelly`}
          style={{ borderRadius: '42% 58% 60% 40% / 50% 45% 55% 50%' }}
          whileHover={{
            borderRadius: '58% 42% 45% 55% / 45% 55% 45% 55%',
            scale: 1.06,
            rotate: 4,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        />
        <div className="pointer-events-none absolute inset-6 rounded-[inherit] bg-glass-sheen opacity-60" />
        {product.signature && (
          <span className="glass-pill absolute left-3 top-3 px-3 py-1 text-[11px] font-semibold text-assi-grape">
            SIGNATURE
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-pink-500 px-2.5 py-1 text-[11px] font-bold text-white">
            {discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <span className="font-display text-xs text-assi-plum">{product.englishName}</span>
        <h3 className="mt-1 font-medium text-assi-ink">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-assi-ink/60">{product.tagline}</p>

        {/* 핵심 자연 성분 태그 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-assi-lavender/70 px-2.5 py-1 text-[11px] font-medium text-assi-grape"
            >
              {b}
            </span>
          ))}
        </div>

        {/* 가격 */}
        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-assi-ink">
              ₩{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-assi-ink/40 line-through">
                ₩{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            aria-label="장바구니 담기"
            className="grid h-10 w-10 place-items-center rounded-full bg-assi-ink text-white transition-all hover:bg-assi-grape group-hover:scale-105"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
