/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@sqrib/utils', '@sqrib/api', '@sqrib/client', '@sqrib/server']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    SOCKET_URL: process.env.SOCKET_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
