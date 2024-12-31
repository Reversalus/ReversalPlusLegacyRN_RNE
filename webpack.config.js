const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);

// Add libraries that need transpilation
const compileNodeModules = [
    "react-native-swiper",
    "react-native-ratings",
    "react-native-vector-icons",
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

// Babel Loader
const babelLoaderConfiguration = {
    test: /\.(js|jsx|ts|tsx)$/,
    include: [
        path.resolve(__dirname, "index.web.js"),
        path.resolve(__dirname, "App.tsx"),
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "component"),
        ...compileNodeModules,
    ],
    use: {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            presets,
            plugins,
        },
    },
};

// SVG Loader
const svgLoaderConfiguration = {
    test: /\.svg$/,
    use: [
        {
            loader: "@svgr/webpack",
        },
    ],
};

// Image Loader
const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
        loader: "url-loader",
        options: {
            name: "[name].[ext]",
        },
    },
};

module.exports = {
    entry: {
        app: path.join(__dirname, "index.web.js"),
    },
    output: {
        path: path.resolve(appDirectory, "dist"),
        publicPath: "/",
        filename: "rnw.bundle.js",
    },
    resolve: {
        extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js", ".jsx"],
        alias: {
            "react-native$": "react-native-web",
        },
    },
    module: {
        rules: [
            babelLoaderConfiguration,
            imageLoaderConfiguration,
            svgLoaderConfiguration,
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
};
