/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@aqac/utils', '@aqac/api', '@aqac/client', '@aqac/server']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    SOCKET_URL: process.env.SOCKET_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
