import { Sparkles } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

// 소셜 로그인 버튼 활성화 여부 (Supabase에 프로바이더 설정 후 env 로 켭니다)
const social = {
  google: process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true',
  kakao: process.env.NEXT_PUBLIC_KAKAO_ENABLED === 'true',
};

export default function LoginPage() {
  return (
    <div className="px-4 pb-10 pt-32">
      <div className="mx-auto max-w-md">
        <div className="glass-card p-8 md:p-10">
          <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
            <Sparkles size={14} /> WELCOME BACK
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-assi-ink">로그인</h1>
          <p className="mt-2 text-sm text-assi-ink/60">ASSI에 다시 오신 걸 환영해요.</p>

          <LoginForm social={social} />
        </div>
      </div>
    </div>
  );
}
