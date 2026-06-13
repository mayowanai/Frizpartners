import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Space_Grotesk, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// 영문: 모던하고 시크한 산세리프
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// 한글: 가독성 높은 본문체
const notoKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-kr',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'ASSI from Korea — Chic, Mysterious, Botanical',
  description:
    '보태니컬 자연 성분과 업사이클링 패키지로 완성한 지속 가능한 시크함. 시그니처 오로라 젤리 미스트를 만나보세요.',
  keywords: ['ASSI', 'K-Beauty', '오로라 젤리 미스트', '비건', '업사이클링', '뷰티'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${notoKr.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden">
        {/* Ambient aurora background */}
        <div className="pointer-events-none fixed inset-0 -z-10 aurora-bg animate-aurora opacity-70" />
        <div className="pointer-events-none fixed -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-assi-lavender opacity-50 blur-3xl" />
        <div className="pointer-events-none fixed -right-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-assi-pink opacity-50 blur-3xl" />

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
