import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ShoppingBag, Package, Mail, ChevronRight } from 'lucide-react';
import { auth } from '@/auth';
import { getUserByEmail, getCartCount } from '@/lib/db';
import GlassCard from '@/components/ui/GlassCard';
import ProfileForm from '@/components/account/ProfileForm';
import LogoutButton from '@/components/auth/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function MyPage() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) redirect('/login');

  const [user, cartCount] = await Promise.all([
    getUserByEmail(session.user.email),
    getCartCount(Number(session.user.id)),
  ]);
  const name = user?.name ?? session.user.name ?? '회원';

  return (
    <div className="px-4 pb-10 pt-32">
      <section className="mx-auto max-w-3xl">
        <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-assi-grape">
          <Sparkles size={14} /> MY PAGE
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-assi-ink md:text-4xl">
          안녕하세요, {name}님 ✨
        </h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-assi-ink/60">
          <Mail size={14} /> {session.user.email}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/cart" className="glass-card flex items-center justify-between p-6 transition hover:bg-white/50">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-assi-ink text-white">
                <ShoppingBag size={20} />
              </span>
              <div>
                <p className="font-medium text-assi-ink">장바구니</p>
                <p className="text-xs text-assi-ink/55">{cartCount}개 담김</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-assi-ink/40" />
          </Link>

          <div className="glass-card flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-assi-lavender/70 text-assi-grape">
                <Package size={20} />
              </span>
              <div>
                <p className="font-medium text-assi-ink">주문내역</p>
                <p className="text-xs text-assi-ink/55">준비 중</p>
              </div>
            </div>
          </div>
        </div>

        <GlassCard className="mt-4 p-6">
          <h2 className="font-display text-lg font-bold text-assi-ink">내 정보 수정</h2>
          <div className="mt-4">
            <ProfileForm defaultName={name} />
          </div>
        </GlassCard>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
