/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Hide the dev-only Next.js indicator badge so it doesn't sit over the design.
  devIndicators: false,
}

export default nextConfig
