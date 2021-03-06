const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
    entry: "./src/main.ts",
    target: "node",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.optimization.minimize = false;
        config.devtool = 'inline-source-map';
    }

    return config;
};