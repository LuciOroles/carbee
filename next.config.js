/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return  [{
            source: '/auth',
            destination: 'https://backend.billowing-truth-38ad.workers.dev/api/auth'
        }]
    }
}

module.exports = nextConfig
