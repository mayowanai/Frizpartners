'use client';

import { useState, useTransition, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Check } from 'lucide-react';
import { addToCartAction } from '@/lib/actions/cart';

export default function AddToCartButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      const res = await addToCartAction(productId);
      if (res.needLogin) {
        router.push('/login');
        return;
      }
      if (res.ok) {
        setAdded(true);
        router.refresh();
        setTimeout(() => setAdded(false), 1500);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label="장바구니 담기"
      className={className}
    >
      {added ? <Check size={16} /> : <ShoppingBag size={16} />}
    </button>
  );
}
