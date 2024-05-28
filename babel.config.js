module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "react-native-reanimated/plugin",
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          "@app": "./src",
          "@app/apis": "./src/apis",
          "@app/components": "./src/components",
          "@app/assets": "./src/assets",
          "@app/locales": "./src/locales",
          "@app/redux": "./src/redux",
          "@app/utils": "./src/utils",
          "@app/values": "./src/values",
          "@app/screens": "./src/screens",
          "@app/types": "./src/types",
          "@app/routes": "./src/screens"
        },
      },
    ]
  ]
};
