module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["import", { libraryName: "@ant-design/react-native" }] // The difference with the Web platform is that you do not need to set the style
  ]
};
