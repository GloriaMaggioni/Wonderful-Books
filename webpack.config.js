const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
    entry: {
        index: './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                quietDeps: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                generator: [
                    {
                        preset: 'webp', 
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: [
                                ["imagemin-webp", { quality: 75 }], 
                            ],
                        },
                    },
                ],
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Wonderfull Books',
            template: './src/index.html',
            favicon: './src/img/favicon.png',
        }),
    ],
    devServer: {
        port: 5000,
        open: true,
        static: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
};
