const dev = process.env.NODE_ENV !== 'production';
module.exports = {
  presets: [
    [
      // '@babel/preset-env',
      'next/babel'
      // {
      //   targets: {
      //     node: 'current'
      //   }
      // }
    ]
  ],
  plugins: [
    // [
    //   'module-resolver',
    //   {
    //     root: ['./src'],
    //     alias: {
    //       components: './src/components',
    //       config: './src/config',
    //       data: './src/data',
    //       enums: './src/enums',
    //       lib: './src/lib',
    //       moves: './src/lib/moves',
    //       styles: './src/styles',
    //       utils: './src/utils'
    //     }
    //   }
    // ],
    ['styled-components', { ssr: !dev, displayName: dev, preprocess: false }]
  ]
};
