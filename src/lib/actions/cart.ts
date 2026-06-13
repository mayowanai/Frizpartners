'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { products } from '@/lib/data/products';

export type AddToCartResult = { ok: boolean; needLogin?: boolean };

export async function addToCartAction(productId: string): Promise<AddToCartResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, needLogin: true };
  if (!products.some((p) => p.id === productId)) return { ok: false };

  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('cart_items')
      .insert({ user_id: user.id, product_id: productId, quantity: 1 });
  }

  revalidatePath('/cart');
  return { ok: true };
}

export async function updateCartQtyAction(productId: string, qty: number): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (qty <= 0) {
    await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', productId);
  } else {
    await supabase
      .from('cart_items')
      .update({ quantity: qty })
      .eq('user_id', user.id)
      .eq('product_id', productId);
  }
  revalidatePath('/cart');
}

export async function removeFromCartAction(productId: string): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', productId);
  revalidatePath('/cart');
}
