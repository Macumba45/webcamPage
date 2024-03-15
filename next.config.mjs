/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: [
        '@mui/material',
        '@mui/system',
        '@mui/icons-material', // If @mui/icons-material is being used
        '@mui/x-data-grid',
    ],
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@mui/styled-engine': '@mui/styled-engine-sc',
        }
        return config
    },
}

export default nextConfig
