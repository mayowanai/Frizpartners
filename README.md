# ASSI from Korea — D2C 웹서비스

> 보태니컬 자연 성분과 업사이클링 패키지로 완성하는 **지속 가능한 시크함(Chic & Mysterious)**.
> 시그니처 **오로라 젤리 미스트(Aurora Jelly Mist)**를 중심으로 한 화장품 자사몰(D2C) 프로토타입.

## 🧩 Tech Stack
- **Next.js 14** (App Router, SSR/ISR)
- **TypeScript** (strict)
- **Tailwind CSS** — 파스텔 컬러셋 + 글래스모피즘 디자인 시스템
- **Framer Motion** — 젤리 제형 / 오로라 광채 마이크로 인터랙션
- **lucide-react** — 아이콘

## 🚀 시작하기
```bash
npm install
npm run dev      # http://localhost:3000
```

프로덕션 빌드:
```bash
npm run build && npm run start
```

## 🔑 외부 API (선택)
`.env.example` 를 `.env.local` 로 복사해 키를 채우면 실데이터로 동작하고,
키가 없으면 **Mock 데이터로 자동 폴백**되어 즉시 화면을 확인할 수 있습니다.

| 변수 | 설명 |
|---|---|
| `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` | YouTube Data API v3 |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram Basic Display API |
| `NEWS_RSS_URL` | 뉴스 / 구글 트렌드 RSS 피드 |

## 🗂 핵심 파일
| 경로 | 설명 |
|---|---|
| `src/components/Hero.tsx` | 시그니처 메인 히어로 (Framer Motion) |
| `src/app/beauty-trend/page.tsx` | 뷰티 트렌드 허브 (Route Handler + ISR) |
| `src/app/api/trends/*` | 외부 API 프록시 Route Handlers |
| `tailwind.config.ts` | 파스텔 컬러 & 글래스모피즘 디자인 토큰 |

---
© ASSI from Korea · Sustainable Beauty, Chic & Mysterious
