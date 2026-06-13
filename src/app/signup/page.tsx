'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Sparkles, UserPlus } from 'lucide-react';
import { signupAction } from '@/lib/actions/auth';

const inputClass =
  'w-full rounded-2xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-assi-ink placeholder-assi-ink/40 outline-none backdrop-blur-md transition focus:border-assi-plum/50 focus:ring-2 focus:ring-assi-plum/20';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary mt-2 w-full justify-center disabled:opacity-60">
      <UserPlus size={16} /> {pending ? '가입 중…' : '회원가입'}
    </button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useFormState(signupAction, undefined);

  return (
    <div className="px-4 pb-10 pt-32">
      <div className="mx-auto max-w-md">
        <div className="glass-card p-8 md:p-10">
          <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
            <Sparkles size={14} /> JOIN ASSI
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-assi-ink">회원가입</h1>
          <p className="mt-2 text-sm text-assi-ink/60">ASSI의 멤버가 되어 신비로운 혜택을 만나보세요.</p>

          <form action={formAction} className="mt-7 space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">이름</label>
              <input name="name" type="text" required placeholder="홍길동" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">이메일</label>
              <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-assi-ink/70">비밀번호</label>
              <input name="password" type="password" required minLength={8} placeholder="8자 이상" className={inputClass} />
            </div>

            {state?.error && (
              <p className="rounded-xl bg-red-50/80 px-3 py-2 text-sm text-red-500">{state.error}</p>
            )}

            <SubmitButton />
          </form>

          <p className="mt-6 text-center text-sm text-assi-ink/60">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-medium text-assi-grape hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
