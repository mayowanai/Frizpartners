'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { loginAction } from '@/lib/actions/auth';
import { createClient } from '@/lib/supabase/client';

const inputClass =
  'w-full rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-assi-ink placeholder-assi-ink/40 outline-none backdrop-blur-md transition focus:border-assi-plum/50 focus:ring-2 focus:ring-assi-plum/20';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary mt-2 w-full justify-center disabled:opacity-60">
      <LogIn size={16} /> {pending ? '로그인 중…' : '로그인'}
    </button>
  );
}

export default function LoginForm({
  social,
}: {
  social: { google: boolean; kakao: boolean };
}) {
  const [state, action] = useFormState(loginAction, undefined);

  function oauth(provider: 'google' | 'kakao') {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/mypage` },
    });
  }

  const anySocial = social.google || social.kakao;

  return (
    <div className="mt-7">
      <form action={action} className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">이메일</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">비밀번호</label>
          <input name="password" type="password" required placeholder="비밀번호" className={inputClass} />
        </div>

        {state?.error && <p className="rounded-xl bg-red-50/80 px-3 py-2 text-sm text-red-500">{state.error}</p>}

        <SubmitButton />
      </form>

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
            onClick={() => oauth('google')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-assi-ink/15 bg-white/80 px-4 py-3 text-sm font-medium text-assi-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="font-display font-bold text-[#4285F4]">G</span>
            Google로 계속하기
            {!social.google && <span className="text-xs text-assi-ink/40">(준비 중)</span>}
          </button>

          <button
            type="button"
            disabled={!social.kakao}
            onClick={() => oauth('kakao')}
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
