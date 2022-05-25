/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@aqac/utils', '@aqac/api', '@aqac/client', '@aqac/server', '@aqac/socket']);

module.exports = withTM({
  reactStrictMode: true,
});
