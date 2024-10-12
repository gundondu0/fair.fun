/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true, // Disable SWC minification

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow images from all domains
            },
            {
                protocol: 'http',
                hostname: '**', // Allow images from all domains
            },
        ],
    },
};

export default nextConfig;
