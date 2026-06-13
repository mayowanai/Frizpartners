'use client';

import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

const inputClass =
  'w-full rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-assi-ink placeholder-assi-ink/40 outline-none backdrop-blur-md transition focus:border-assi-plum/50 focus:ring-2 focus:ring-assi-plum/20';

export default function LoginForm({
  social,
}: {
  social: { google: boolean; kakao: boolean };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
      redirect: false,
    });
    setPending(false);
    if (res?.error) {
      setError('이메일 또는 비밀번호가 올바르지 않아요');
    } else {
      router.push('/mypage');
      router.refresh();
    }
  }

  const anySocial = social.google || social.kakao;

  return (
    <div className="mt-7">
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">이메일</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">비밀번호</label>
          <input name="password" type="password" required placeholder="비밀번호" className={inputClass} />
        </div>

        {error && <p className="rounded-xl bg-red-50/80 px-3 py-2 text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={pending} className="btn-primary mt-2 w-full justify-center disabled:opacity-60">
          <LogIn size={16} /> {pending ? '로그인 중…' : '로그인'}
        </button>
      </form>

      {/* 소셜 로그인 */}
      <div className="mt-6">
        <div className="flex items-center gap-3 text-xs text-assi-ink/40">
          <span className="h-px flex-1 bg-assi-ink/10" />
          소셜 계정으로
          <span className="h-px flex-1 bg-assi-ink/10" />
        </div>

        <div className="mt-4 space-y-2.5">
          <button
            type="button"
            disabled={!social.google}
            onClick={() => signIn('google', { callbackUrl: '/mypage' })}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-assi-ink/15 bg-white/80 px-4 py-3 text-sm font-medium text-assi-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="font-display font-bold text-[#4285F4]">G</span>
            Google로 계속하기
            {!social.google && <span className="text-xs text-assi-ink/40">(준비 중)</span>}
          </button>

          <button
            type="button"
            disabled={!social.kakao}
            onClick={() => signIn('kakao', { callbackUrl: '/mypage' })}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEE500] px-4 py-3 text-sm font-medium text-[#3C1E1E] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="font-bold">💬</span>
            카카오로 계속하기
            {!social.kakao && <span className="text-xs text-[#3C1E1E]/50">(준비 중)</span>}
          </button>
        </div>

        {!anySocial && (
          <p className="mt-3 text-center text-[11px] text-assi-ink/40">
            소셜 로그인은 곧 활성화됩니다. 지금은 이메일로 로그인해주세요.
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-assi-ink/60">
        아직 회원이 아니신가요?{' '}
        <Link href="/signup" className="font-medium text-assi-grape hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
