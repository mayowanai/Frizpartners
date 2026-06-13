'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { updateCartQtyAction, removeFromCartAction } from '@/lib/actions/cart';

export interface CartLine {
  product: Product;
  quantity: number;
}

export default function CartView({ initialCart }: { initialCart: CartLine[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const total = initialCart.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const totalCount = initialCart.reduce((sum, l) => sum + l.quantity, 0);

  function changeQty(productId: string, qty: number) {
    startTransition(async () => {
      await updateCartQtyAction(productId, qty);
      router.refresh();
    });
  }
  function remove(productId: string) {
    startTransition(async () => {
      await removeFromCartAction(productId);
      router.refresh();
    });
  }

  if (initialCart.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-4 p-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-assi-lavender/60 text-assi-grape">
          <ShoppingBag size={28} />
        </span>
        <p className="text-assi-ink/70">장바구니가 비어 있어요.</p>
        <Link href="/shop" className="btn-primary group">
          쇼핑하러 가기 <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 lg:grid-cols-[1fr_320px] ${pending ? 'opacity-70' : ''}`}>
      {/* Items */}
      <div className="space-y-4">
        {initialCart.map(({ product, quantity }) => (
          <div key={product.id} className="glass-card flex items-center gap-4 p-4">
            <div className={`h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br ${product.gradient}`} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xs text-assi-plum">{product.englishName}</p>
              <h3 className="truncate font-medium text-assi-ink">{product.name}</h3>
              <p className="mt-1 font-display font-bold text-assi-ink">
                ₩{(product.price * quantity).toLocaleString()}
              </p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/50 p-1">
              <button
                onClick={() => changeQty(product.id, quantity - 1)}
                disabled={pending}
                className="grid h-7 w-7 place-items-center rounded-full text-assi-ink hover:bg-white/80 disabled:opacity-40"
                aria-label="수량 감소"
              >
                <Minus size={13} />
              </button>
              <span className="w-7 text-center text-sm font-medium text-assi-ink">{quantity}</span>
              <button
                onClick={() => changeQty(product.id, quantity + 1)}
                disabled={pending}
                className="grid h-7 w-7 place-items-center rounded-full text-assi-ink hover:bg-white/80 disabled:opacity-40"
                aria-label="수량 증가"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              onClick={() => remove(product.id)}
              disabled={pending}
              className="grid h-8 w-8 place-items-center rounded-full text-assi-ink/50 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
              aria-label="삭제"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <aside className="glass-card h-fit p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-lg font-bold text-assi-ink">주문 요약</h2>
        <div className="mt-5 space-y-2 text-sm text-assi-ink/70">
          <div className="flex justify-between">
            <span>상품 수</span>
            <span>{totalCount}개</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>무료</span>
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-white/40 pt-4">
          <span className="text-sm text-assi-ink/70">총 결제금액</span>
          <span className="font-display text-2xl font-bold text-assi-ink">₩{total.toLocaleString()}</span>
        </div>
        <button
          className="btn-primary mt-6 w-full justify-center"
          onClick={() => alert('결제(PG 연동)는 다음 단계에서 구현됩니다 🙂')}
        >
          주문하기
        </button>
      </aside>
    </div>
  );
}
