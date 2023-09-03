/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const baseUrl = 'https://backend.billowing-truth-38ad.workers.dev/api';
        
        return [{
            source: '/auth',
            destination: `${baseUrl}/auth`
        },
        {
            source: '/availability/:path*',
            destination: `${baseUrl}/availability/:path*`
        },
        {
            source: '/appointments',
            destination: `${baseUrl}/appointments`
        }]
    }
}

module.exports = nextConfig
