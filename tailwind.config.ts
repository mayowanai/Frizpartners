import type { Config } from 'tailwindcss';

/**
 * ASSI from Korea — 디자인 시스템
 * - Base Palette: 연보라 / 핑크 / 노랑 파스텔 그라데이션
 * - Point: 파스텔 위에 얹는 글래스모피즘(backdrop-blur)
 * - Motion: 젤리 제형 · 오로라 광채 표현용 keyframes
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        assi: {
          // Base pastel palette
          lavender: '#F3E8FF',
          pink: '#FCE7F3',
          yellow: '#FEF08A',
          // Surface & ink — '시크하고 신비로운' 무드용 딥톤
          bg: '#FBF7FF',
          mist: '#EADCFB',
          plum: '#7C5CAD',
          grape: '#5B3E8E',
          ink: '#2A2342',
        },
      },
      fontFamily: {
        // 영문: 모던 시크 산세리프 / 한글: 가독성 높은 본문체
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-noto-kr)', 'var(--font-display)', 'ui-sans-serif', 'sans-serif'],
      },
      backgroundImage: {
        aurora: 'linear-gradient(120deg, #F3E8FF 0%, #FCE7F3 45%, #FEF08A 100%)',
        'aurora-soft': 'linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 50%, #FEF08A 100%)',
        'glass-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(124, 92, 173, 0.18)',
        'glass-lg': '0 20px 60px -10px rgba(91, 62, 142, 0.28)',
        glow: '0 0 50px rgba(243, 232, 255, 0.9)',
        jelly: '0 18px 40px -12px rgba(124, 92, 173, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        // 젤리 제형의 쫀쫀하게 출렁이는 느낌
        jelly: {
          '0%, 100%': {
            borderRadius: '42% 58% 60% 40% / 50% 45% 55% 50%',
            transform: 'rotate(0deg) scale(1)',
          },
          '50%': {
            borderRadius: '58% 42% 45% 55% / 45% 55% 45% 55%',
            transform: 'rotate(6deg) scale(1.04)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        aurora: 'aurora 14s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        jelly: 'jelly 7s ease-in-out infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
