/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/static/medias/**',
            },
        ],
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', 'env.d.ts'],
};

module.exports = nextConfig;
