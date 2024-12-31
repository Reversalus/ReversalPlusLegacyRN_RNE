module.exports = {
  presets: [
    "@babel/preset-react",
    "module:@react-native/babel-preset",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", { loose: true }],
    ["@babel/plugin-transform-class-properties", { loose: true }],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    ["@babel/plugin-transform-private-property-in-object", { loose: true }],
    process.env.NODE_ENV === "development" && "react-refresh/babel",
  ].filter(Boolean),
};
