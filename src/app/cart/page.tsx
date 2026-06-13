import { redirect } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { products } from '@/lib/data/products';
import CartView, { type CartLine } from '@/components/cart/CartView';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: items } = await supabase
    .from('cart_items')
    .select('product_id, quantity')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  const cart: CartLine[] = (items ?? []).flatMap((it) => {
    const product = products.find((p) => p.id === it.product_id);
    return product ? [{ product, quantity: it.quantity as number }] : [];
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
