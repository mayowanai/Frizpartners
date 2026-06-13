'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Sparkles, User } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { href: '/about', label: '회사소개', en: 'About' },
  { href: '/shop', label: '브랜드 & 제품', en: 'Shop' },
  { href: '/event', label: '이벤트', en: 'Event' },
  { href: '/beauty-trend', label: '뷰티 트렌드', en: 'Trend' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const displayName = (user?.user_metadata?.name as string | undefined) ?? '마이페이지';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`glass-nav mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-shadow duration-300 ${
          scrolled ? 'shadow-glass' : ''
        }`}
      >
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-assi-ink text-white transition-transform group-hover:rotate-12">
            <Sparkles size={18} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-assi-ink">
            ASSI<span className="text-assi-plum">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-assi-grape' : 'text-assi-ink/70 hover:text-assi-ink'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/70"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="장바구니"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-assi-ink transition-colors hover:bg-white/80"
          >
            <ShoppingBag size={18} />
          </Link>

          {user ? (
            <Link
              href="/mypage"
              className="hidden h-9 items-center gap-1.5 rounded-full bg-white/50 px-3 text-sm font-medium text-assi-ink transition-colors hover:bg-white/80 sm:inline-flex"
            >
              <User size={16} /> {displayName}
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden h-9 items-center rounded-full bg-assi-ink px-4 text-sm font-medium text-white transition-colors hover:bg-assi-grape sm:inline-flex"
            >
              로그인
            </Link>
          )}

          <button
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-assi-ink md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-card mx-auto mt-2 max-w-6xl overflow-hidden p-2 md:hidden"
          >
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-assi-ink hover:bg-white/60"
                  >
                    {item.label}
                    <span className="font-display text-xs text-assi-plum">{item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-1 border-t border-white/40 pt-1">
              <Link href="/cart" className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-assi-ink hover:bg-white/60">
                <ShoppingBag size={16} /> 장바구니
              </Link>
              {user ? (
                <Link href="/mypage" className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-assi-ink hover:bg-white/60">
                  <User size={16} /> 마이페이지
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-assi-grape hover:bg-white/60">
                  <User size={16} /> 로그인 / 회원가입
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
