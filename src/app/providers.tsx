'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

/** 클라이언트 컴포넌트에서 useSession() 을 쓰기 위한 세션 컨텍스트 */
export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
