// 由於 webpack 是基於 Node 進行構建的，所以 webpack 的配置檔案中任何合法的 Node 程式碼都是支援的
const path = require('path');

// 在記憶體中根據指定的模板頁面產生一份記憶體中的首頁，同時自動把打包好的 bundle 注入到頁面底部
// 如果要配置外掛，需要在導出的對象中掛載一個 plugins 節點
const htmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 當以命令列形式執行 webpack 或 webpack-dev-server 的時候，工具會發現我們並沒有提供要打包的檔案的入口和出口檔案，此時，他會檢查專案根目錄中的配置檔案並讀取這個檔案，就拿到了導出的這個配置對象，然後根據這個對像進行打包構建
module.exports = {
    // 入口檔案
    entry: path.join(__dirname, './src/main.js'),
    // 出口檔案
    output: {
        // 輸出路徑
        path: path.join(__dirname, './dist'),
        // 指定輸出檔案的名稱
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        hot: true,
        port: 3000,
        // contentBase: 'src'
    },
    // 所有 webpack 外掛的配置節點
    plugins: [
        new htmlWebpackPlugin({
            // 指定模板檔案路徑
            template: path.join(__dirname, './src/index.html'),
            // 設定產生的記憶體頁面的名稱
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
    ],
    // 配置所有第三方 loader 模組
    module: {
        // 第三方模組的匹配規則
        rules: [
            // 處理 css 檔案的 loader
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 處理 less 檔案的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            // 處理 scss 檔案的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // 處理 圖片路徑 的 loader
            // limit 給定的值是圖片的大小，單位是 byte，如果我們引用的圖片大於或等於給定的 limit 值，則不會被轉為 base64 格式的字串，如果從圖片小於給定的 limit 值，則會被轉為 base64 的字串
            { test: /\.(jpg|png|jpeg|gif|bmp|ico)$/, use: 'url-loader?limit=1856324&name=[hash:8]-[name].[ext]' },
            // 處理 字型檔案 的 loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            // babel 來轉換高級的 ES 語法
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // 這是處理 .vue 檔案的 loader
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    resolve: {
        alias: {
            // 修改 vue 被匯入時候的包的路徑
            // 'vue$': 'vue/dist/vue.js'
        }
    }
}