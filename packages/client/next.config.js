/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};
// const withLess = require('next-with-less');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require('path');

// const pathToLessFileWithVariables = path.resolve(
// 'styles',
// );

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withLess = require('@zeit/next-less');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withCSS = require('@zeit/next-css');

// module.exports = withCSS(
//   withLess({
//     webpack(config) {
//       return config;
//     },
//   }),
// );

module.exports = withCSS(withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        '@primary-color': '#red',
        '@border-radius-base': '50px',
      },
    },
  },
}));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@aqac/utils', '@aqac/api', '@aqac/client']);

module.exports = withTM();
