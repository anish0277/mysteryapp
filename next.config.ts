/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the turbopack.enabled option as it's not recognized
  experimental: {
    turbo: {
      // Turbopack-specific options can go here if needed
    }
  }
};

export default nextConfig;