/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow Next.js to host images pulled from Google session data
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', 
            }
        ] 
    }
};

export default nextConfig;

/* (https://lh3.googleusercontent.com/a/ACg8ocKGLi7zt8rpenzor0UYpTCtJgSa8yo5FJ5yXUWdYaa7=s96-c) */