'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AuthState = { error?: string } | undefined;

const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(40),
  email: z.string().email('올바른 이메일 형식이 아니에요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 해요'),
});

export async function signupAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { name: parsed.data.name } },
  });

  if (error) {
    if (/already|registered|exists/i.test(error.message)) {
      return { error: '이미 가입된 이메일이에요' };
    }
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/mypage');
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: '이메일과 비밀번호를 입력해주세요' };

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: '이메일 또는 비밀번호가 올바르지 않아요' };

  revalidatePath('/', 'layout');
  redirect('/mypage');
}

const profileSchema = z.object({ name: z.string().min(1, '이름을 입력해주세요').max(40) });
export type ProfileState = { error?: string; success?: boolean } | undefined;

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const parsed = profileSchema.safeParse({ name: formData.get('name') });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ data: { name: parsed.data.name } });
  if (error) return { error: error.message };

  revalidatePath('/mypage');
  return { success: true };
}
