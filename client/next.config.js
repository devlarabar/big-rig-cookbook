/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['mongoose']
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
    async rewrites() {
        return [
          {
            source: '/server/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_URL}/server/:path*`,
          },
        ]
      },
}

module.exports = nextConfig
