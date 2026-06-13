import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: 'aurora-jelly-mist',
    name: '오로라 젤리 미스트',
    englishName: 'Aurora Jelly Mist',
    tagline: '몽글몽글 젤리 제형의 수분 광채 미스트',
    price: 23900,
    originalPrice: 32000,
    badges: ['하이드라 젤리', '병풀 추출물', '비건'],
    gradient: 'from-assi-lavender via-assi-pink to-assi-yellow',
    signature: true,
  },
  {
    id: 'botanic-glow-serum',
    name: '보태닉 글로우 세럼',
    englishName: 'Botanic Glow Serum',
    tagline: '식물성 나이아신아마이드 톤업 세럼',
    price: 27000,
    originalPrice: 34000,
    badges: ['나이아신아마이드', '어성초', '비건'],
    gradient: 'from-assi-lavender via-purple-200 to-assi-pink',
  },
  {
    id: 'mystic-dew-cream',
    name: '미스틱 듀 크림',
    englishName: 'Mystic Dew Cream',
    tagline: '촉촉하게 감싸는 보습 젤 크림',
    price: 25000,
    originalPrice: 29000,
    badges: ['세라마이드', '알로에', '저자극'],
    gradient: 'from-assi-pink via-rose-200 to-assi-yellow',
  },
  {
    id: 'petal-cleansing-gel',
    name: '페탈 클렌징 젤',
    englishName: 'Petal Cleansing Gel',
    tagline: '꽃잎 추출물의 산뜻한 약산성 클렌저',
    price: 16900,
    originalPrice: 21000,
    badges: ['약산성', '카모마일', '저자극'],
    gradient: 'from-purple-200 via-assi-lavender to-assi-pink',
  },
];

export const signatureProduct: Product = products.find((p) => p.signature) ?? products[0];
