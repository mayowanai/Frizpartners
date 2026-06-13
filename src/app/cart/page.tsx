import { redirect } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { auth } from '@/auth';
import { getCartItems } from '@/lib/db';
import { products } from '@/lib/data/products';
import CartView, { type CartLine } from '@/components/cart/CartView';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const items = await getCartItems(Number(session.user.id));
  const cart: CartLine[] = items.flatMap((it) => {
    const product = products.find((p) => p.id === it.product_id);
    return product ? [{ product, quantity: it.quantity }] : [];
  });

  return (
    <div className="px-4 pb-10 pt-32">
      <section className="mx-auto max-w-5xl">
        <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
          <Sparkles size={14} /> CART
        </span>
        <h1 className="mb-8 mt-5 font-display text-3xl font-bold tracking-tight text-assi-ink md:text-4xl">
          장바구니
        </h1>
        <CartView initialCart={cart} />
      </section>
    </div>
  );
}
