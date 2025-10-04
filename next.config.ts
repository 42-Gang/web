import type { NextConfig } from 'next';
import { env } from '~/constants/variables';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${env.api_base}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
