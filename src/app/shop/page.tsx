import Link from 'next/link';
import { Sparkles, Droplets, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { products, signatureProduct } from '@/lib/data/products';

export default function ShopPage() {
  return (
    <div className="px-4 pb-10 pt-28">
      {/* Hero banner — 시그니처 제품 */}
      <section className="mx-auto max-w-6xl">
        <div className="glass-card relative overflow-hidden p-8 md:p-14">
          <div className="absolute -right-20 -top-20 h-80 w-80 animate-jelly bg-gradient-to-br from-assi-lavender via-assi-pink to-assi-yellow opacity-60 blur-2xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
                <Sparkles size={14} /> SIGNATURE
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-assi-ink md:text-5xl">
                {signatureProduct.englishName}
              </h1>
              <p className="mt-3 text-lg text-assi-ink/80">{signatureProduct.name}</p>
              <p className="mt-4 max-w-md text-assi-ink/70">
                {signatureProduct.tagline}. 몽글몽글한 젤리가 톡 터지며 수분 광채로 번집니다.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-assi-ink">
                  ₩{signatureProduct.price.toLocaleString()}
                </span>
                {signatureProduct.originalPrice && (
                  <span className="text-sm text-assi-ink/40 line-through">
                    ₩{signatureProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <Link href="#products" className="btn-primary group mt-8">
                전 제품 보기
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 젤리 비주얼 */}
            <div className="relative mx-auto grid h-64 w-64 place-items-center md:h-80 md:w-80">
              <div
                className={`absolute inset-0 animate-jelly bg-gradient-to-br ${signatureProduct.gradient} shadow-jelly`}
              />
              <div className="absolute inset-4 rounded-[inherit] bg-glass-sheen" />
              <Droplets className="relative text-white/80" size={48} />
            </div>
          </div>
        </div>
      </section>

      {/* 제품 그리드 */}
      <section id="products" className="mx-auto mt-16 max-w-6xl scroll-mt-28">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-assi-ink">전 제품</h2>
          <span className="text-sm text-assi-ink/55">{products.length}개 제품</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
