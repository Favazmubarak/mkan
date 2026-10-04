import type { NextConfig } from "next";

function getRemotePatterns() {
  const patterns: Array<{ protocol: "https"; hostname: string }> = [
    {
      protocol: "https",
      hostname: "pub-37d7351060641228a3c4c0fe9806ae.r2.dev",
    },
  ];

  if (process.env.R2_PUBLIC_DOMAIN) {
    try {
      const hostname = new URL(process.env.R2_PUBLIC_DOMAIN).hostname;
      if (hostname && !patterns.some((p) => p.hostname === hostname)) {
        patterns.push({ protocol: "https", hostname });
      }
    } catch {
      // Ignore invalid URL format
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: getRemotePatterns(),
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/expertise",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
