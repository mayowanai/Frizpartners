'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser, updateUserName } from '@/lib/db';
import { signIn, auth } from '@/auth';
import { revalidatePath } from 'next/cache';

const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(40),
  email: z.string().email('올바른 이메일 형식이 아니에요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 해요'),
});

export type SignupState = { error?: string } | undefined;

export async function signupAction(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요' };
  }
  const { name, email, password } = parsed.data;

  const existing = await getUserByEmail(email);
  if (existing) return { error: '이미 가입된 이메일이에요' };

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser({ email, passwordHash, name });

  // 가입 즉시 자동 로그인 → 마이페이지로 이동
  await signIn('credentials', { email, password, redirectTo: '/mypage' });
  return undefined;
}

const profileSchema = z.object({ name: z.string().min(1, '이름을 입력해주세요').max(40) });

export type ProfileState = { error?: string; success?: boolean } | undefined;

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const session = await auth();
  if (!session?.user?.id) return { error: '로그인이 필요해요' };

  const parsed = profileSchema.safeParse({ name: formData.get('name') });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? '입력값을 확인해주세요' };
  }
  await updateUserName(Number(session.user.id), parsed.data.name);
  revalidatePath('/mypage');
  return { success: true };
}
