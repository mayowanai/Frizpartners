import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getUserByEmail, upsertOAuthUser } from '@/lib/db';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const providers: NextAuthConfig['providers'] = [
  Credentials({
    credentials: { email: {}, password: {} },
    authorize: async (credentials) => {
      const parsed = loginSchema.safeParse(credentials);
      if (!parsed.success) return null;
      const user = await getUserByEmail(parsed.data.email);
      if (!user?.password_hash) return null;
      const valid = await bcrypt.compare(parsed.data.password, user.password_hash);
      if (!valid) return null;
      return { id: String(user.id), email: user.email, name: user.name };
    },
  }),
];

// 소셜 로그인 — 환경변수가 설정된 경우에만 활성화 (없으면 버튼만 비활성)
if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}
if (process.env.AUTH_KAKAO_ID && process.env.AUTH_KAKAO_SECRET) {
  providers.push(
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
  );
}

export const socialEnabled = {
  google: Boolean(process.env.AUTH_GOOGLE_ID),
  kakao: Boolean(process.env.AUTH_KAKAO_ID),
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        if (account && account.provider !== 'credentials' && user.email) {
          // 소셜 로그인 → DB upsert 후 우리 DB의 id를 토큰에 저장
          const dbUser = await upsertOAuthUser(user.email, user.name ?? '회원', account.provider);
          token.id = String(dbUser.id);
        } else if (user.id) {
          token.id = user.id;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
