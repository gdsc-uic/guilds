const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
			};
		}
		return config;
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = withContentlayer(nextConfig);
