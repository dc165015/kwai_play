//'use strict'

import webpack from 'webpack';
// import TerserPlugin from "terser-webpack-plugin";
import * as path from 'path';
import { UserScriptHeaderPlugin } from './config/header';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const packageJson = require('./package.json');

const node_env = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'production';
        case 'development':
            return 'development';
        default:
            return 'none';
    }
};

delete process.env.TS_NODE_PROJECT; // this line is for TsConfigPathsPlugin error: Found no baseUrl

const config: webpack.Configuration = {
    mode: node_env(),
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${packageJson.name}.user.js`,
    },
    resolve: {
        extensions: ['.js', '.ts', '.css', '.scss'],
        // if use TsconfigPathPlugin, we don't need paths alias anymore.
        // alias: {
        //     src: path.resolve(__dirname, './src'),
        //     lib: path.resolve(__dirname, './src/lib'),
        // },
        plugins: [
            new TsconfigPathsPlugin({
                // baseUrl: __dirname,
                // configFile: path.join(appRoot, "tsconfig.json"),
                // extensions: ['.js', '.ts', '.tsx'],
            }),
        ],
    },
    module: {
        rules: [
            // {
            //   test: /\.js$/,
            //   exclude: /node_modules/,
            //   use: {
            //     loader: 'babel-loader',
            //     options: {
            //       presets: ['@babel/preset-env']
            //     }
            //   }
            // },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    { loader: 'style-loader' },
                    { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    // Translates CSS into CommonJS
                    { loader: 'css-loader', options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    // Compiles Sass to CSS
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: ['url-loader'],
            },
        ],
    },
    optimization: {
        minimize: process.env.MINIMIZER === 'TRUE' ? true : false,
        minimizer: [
            // new TerserPlugin({
            //   terserOptions: {
            //     ecma: 2015,
            //     beautify: false
            //   }
            // })
        ],
    },
    plugins: [new UserScriptHeaderPlugin()],
};

export default config;
