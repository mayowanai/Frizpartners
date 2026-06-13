'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { addCartItem, setCartQty, removeCartItem } from '@/lib/db';
import { products } from '@/lib/data/products';

async function requireUserId(): Promise<number | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  return Number(session.user.id);
}

export type AddToCartResult = { ok: boolean; needLogin?: boolean };

export async function addToCartAction(productId: string): Promise<AddToCartResult> {
  const userId = await requireUserId();
  if (!userId) return { ok: false, needLogin: true };
  if (!products.some((p) => p.id === productId)) return { ok: false };

  await addCartItem(userId, productId, 1);
  revalidatePath('/cart');
  return { ok: true };
}

export async function updateCartQtyAction(productId: string, qty: number): Promise<void> {
  const userId = await requireUserId();
  if (!userId) return;
  await setCartQty(userId, productId, qty);
  revalidatePath('/cart');
}

export async function removeFromCartAction(productId: string): Promise<void> {
  const userId = await requireUserId();
  if (!userId) return;
  await removeCartItem(userId, productId);
  revalidatePath('/cart');
}
