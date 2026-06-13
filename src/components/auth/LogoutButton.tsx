'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-assi-ink/15 bg-white/50 px-5 py-2.5 text-sm font-medium text-assi-ink transition hover:bg-white/80"
    >
      <LogOut size={15} /> 로그아웃
    </button>
  );
}
