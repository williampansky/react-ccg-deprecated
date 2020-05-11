const dev = process.env.NODE_ENV !== 'production';
module.exports = {
  presets: [
    [
      // '@babel/preset-env',
      'next/babel',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          lib: './lib'
        }
      }
    ],
    ['styled-components', { ssr: !dev, displayName: dev, preprocess: false }]
  ]
};
