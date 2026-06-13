/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 실제 제품/썸네일 이미지를 연결할 때 사용 (프로토타입은 CSS 그라데이션으로 대체)
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
    ],
  },
};

export default nextConfig;
