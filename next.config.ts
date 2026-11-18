import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Static HTML version of the talk slides, served from public/talk/
  async rewrites() {
    return [{ source: "/talk", destination: "/talk/index.html" }];
  },
};

export default withNextIntl(nextConfig);
