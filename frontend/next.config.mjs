/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React's strict mode for better debugging and detecting potential problems
    reactStrictMode: true,
  
    // Enable SWC-based minification (default for Next.js) for better performance
    swcMinify: true,
  
    // Custom Webpack configuration (optional) for further tweaks
    webpack: (config) => {
      // Example: Add custom Webpack rules or modifications
      return config;
    },
  
    // Environment variables for both server and client
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,  // Example variable
    },
  
    // Optional: Add rewrites or redirects if needed
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://example.com/api/:path*'  // Proxy to an external API
        },
      ];
    },
  };
  
  export default nextConfig;
  