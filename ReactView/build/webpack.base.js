const path = require('path');
let webpack=require('webpack');
let HtmlWebpackPlugin=require('html-webpack-plugin');	// 引入插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function resolve (dir) {
    console.log('',path.join(__dirname, dir))
    return path.join(__dirname, dir)
}
module.exports = {
    resolve: {
        alias:{
            '@': resolve('../src')
        }
    },
    entry: './src/index.js',
     /*----以下是新增loader的代码----*/

    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                // exclude:/(node_modules)/,  //排除掉nod_modules,优化打包速度
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    "url-loader"
                ]
            },
            {
                test:/\.(svg|ttf|woff|eot)$/,
                use:[
                    "file-loader"
                ]
            },
            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         use: [ 'less-loader'],
            //     }),
            //  },
            {
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     use: [ 'css-loader'],
                // }),
                use: ExtractTextPlugin.extract({
                    use: [  
                        {
                            loader: 'css-loader'
            
                        }
                    ]
                }),
               
            },
          
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'fast-sass-loader',
                        {
                            // 添加 @alifd/next-theme-loader，引入自定义主题样式对应的 scss 变量
                            loader: '@alifd/next-theme-loader',
                            options: {
                                theme: '@alifd/theme-1212',
                                // 基准包，默认是@alifd/next
                                base: '@alifd/next',
                                // 注入变量，来编译组件样式
                                // 支持 Object 和 String ， 如果是 String 请写绝对路径 例如: modifyVars: path.join(__dirname, 'variable.scss')
                                // 以下为Object
                                modifyVars: {
                                    '$css-prefix': '"myprefix-"',
                                },
                            },
                        },
                    ],
                }),
            },
        ]
    },

    /*----以下是新增插件的代码----*/
    plugins: [
        new ExtractTextPlugin('[name][hash].css'),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: path.resolve(__dirname, '../dist/index.html'),
            hash: true,         //会在打包好的bundle.js后面加上hash串
            minify:{ //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            },
        }),
      
    ]
};
