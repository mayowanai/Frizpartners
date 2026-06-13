import type { DefaultSession } from 'next-auth';

// 세션/토큰에 우리 DB의 user id 를 추가하는 타입 보강
declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}
