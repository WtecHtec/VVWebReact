// 存放 prod 配置
const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
// 基本配置
const common = require('./webpack.base.js');
let webpack=require('webpack');
// 打包之前清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let MiniCssExtractPlugin=require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
        mode: 'production',
        output: {
            filename: 'js/[name].[hash].js', // 每次保存 hash 都变化
            path: path.resolve(__dirname, '../dist')
        },
        optimization: {
            minimize: true,
            minimizer: [ 
                new TerserPlugin({
                    terserOptions: {
                        ecma: 5,
                        warnings: false,
                        parse: {},
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        },
                        mangle: true, // Note `mangle.properties` is `false` by default.
                        module: false,
                        output: null,
                        toplevel: false,
                        nameCache: null,
                        ie8: true,
                        keep_fnames: false,
                        safari10: true
                    }
            })
         ],
        },
        module: {},
        plugins: [
            new CleanWebpackPlugin(), //打包前先清空
               /* 提取单独打包css文件 */
            new MiniCssExtractPlugin({
                    filename: "[name][hash].css",
                    chunkFilename: "[id][hash].css"
            }),
            new CompressionPlugin({
                filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
                algorithm: 'gzip', // 算法       
                test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
                threshold: 10240, // 只处理比这个值大的资源。按字节计算
                minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
            }),
          
        ]

})