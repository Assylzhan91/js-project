const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ReactToHtmlPlugin = require('react-to-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

const CompressionPlugin = require('compression-webpack-plugin');

const conf = {
    mode: 'development',
    entry: ["@babel/polyfill", "./src/index.js"],

    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        // chunkFilename: '[name].bundle.js',
    },

    optimization: {

        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin({
               /* cache: true,
                sourceMap: true*/
            })
        ],

     /*   splitChunks: {
            chunks: 'all'
        },*/
    }, //optimization

    devServer: {
        overlay: true,
      /*  contentBase: './dist',*/
        port: 9021,
        open: true,
        historyApiFallback: true
    },


    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }, //JAVASCRIPT

            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hot: process.env.NODE_ENV === 'development',
                            esModule: true,
                            reloadAll: true,
                        }
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]'
                            },
                            importLoaders: 1,
                        },
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                fiber: false,
                            },
                            prependData: '$env: ' + process.env.NODE_ENV + ';',
                            sourceMap: true,
/*                            includePaths: ['./src/components/header/'],*/
                        }
                    }
                ]
            },  //SCSS

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: false,
                            esModule: true,
                            outputPath: 'images',
                            name: '[contenthash].[ext]'
                        }
                    }
                ],
            }, //pictures

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, // Typescript

        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.ejs",
             inject: 'body',
             minify: {
                 removeComments: true,
                 collapseWhitespace: false,
                 removeAttributeQuotes: false
             },
             chunksSortMode: 'dependency'
        }),

        new MiniCssExtractPlugin({
            filename: devMode ?  'css/[name].[hash].css' : '[name].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),


        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        })

    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src/'),
            'core': path.resolve(__dirname, 'src/core/'),
            'services': path.resolve(__dirname, 'src/services/'),
            'component': path.resolve(__dirname, 'src/component/'),
            'templates': path.resolve(__dirname, 'src/templates/'),
        },
        extensions: ['.js', '.jsx']
    },
    stats: {
        colors: {
            red: '\u001b[32m'
        }
    },
    devtool: 'inline-source-map'
}

module.exports  =  (env, options) =>{

    const prod = options.mode === 'production';

    conf.devtool = prod
        ? false
        : 'eval-sourcemap';

    return conf;
};