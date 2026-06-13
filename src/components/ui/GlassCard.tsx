import type { ReactNode } from 'react';

/** 글래스모피즘 카드 래퍼 (정적 — 서버 컴포넌트) */
export default function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}
