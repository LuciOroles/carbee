/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return  [{
            source: '/auth',
            destination: 'https://backend.billowing-truth-38ad.workers.dev/api/auth'
        },
        {
            source: '/availability/:path*',
            destination: 'https://backend.billowing-truth-38ad.workers.dev/api/availability/:path*'
        }
        ]
    }
}

module.exports = nextConfig
