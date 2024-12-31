const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);

// Libraries that need transpilation
const compileNodeModules = [
    "react-native-swiper",
    "react-native-ratings",
    "react-native-vector-icons",
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

// Babel Loader Configuration
const babelLoaderConfiguration = {
    test: /\.(js|jsx|ts|tsx)$/,
    include: [
        path.resolve(appDirectory, "index.web.js"),
        path.resolve(appDirectory, "App.tsx"),
        path.resolve(appDirectory, "src"),
        path.resolve(appDirectory, "component"),
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

// SVG Loader Configuration
const svgLoaderConfiguration = {
    test: /\.svg$/,
    use: [
        {
            loader: "@svgr/webpack",
        },
    ],
};

const ttfLoaderConfiguration = {
    test: /\.ttf$/,
    loader: 'url-loader', // or directly file-loader
    include: [
      path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    ],
  };

// Image Loader Configuration
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
        app: path.join(appDirectory, "index.web.js"),
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
            "react-native-vector-icons": path.resolve(
                appDirectory,
                "node_modules/react-native-vector-icons"
            ),
        },
    },
    module: {
        rules: [
            babelLoaderConfiguration,
            imageLoaderConfiguration,
            svgLoaderConfiguration,
            ttfLoaderConfiguration,
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(appDirectory, "index.html"),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true), // Allows differentiation of dev vs prod
        }),
    ],
    devServer: {
        historyApiFallback: true, // Ensures SPA routes work correctly
        static: {
            directory: path.join(appDirectory, "public"),
        },
        compress: true, // Enables gzip compression for assets
        hot: true, // Hot module replacement for faster development
        port: 3000, // Specify a default port
    },
};
