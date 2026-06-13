'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="inline-flex items-center gap-2 rounded-full border border-assi-ink/15 bg-white/50 px-5 py-2.5 text-sm font-medium text-assi-ink transition hover:bg-white/80"
    >
      <LogOut size={15} /> 로그아웃
    </button>
  );
}
