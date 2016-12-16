/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/16
 * Summary     : 
 *              http://www.tuicool.com/articles/22aQ7vu
 * *************************************************************/

/**
 * 插件一般都是用于输出bundle的node模块。

 例如，uglifyJSPlugin获取bundle.js然后压缩和混淆内容以减小文件体积。

 类似的extract-text-webpack-plugin内部使用css-loader和style-loader来收集所有的css到一个地方最终将结果提取结果到一个独立的”styles.css“文件，并且在html里边引用style.css文件。

 //webpack.config.js
 // 获取所有的.css文件，合并它们的内容然后提取css内容到一个独立的”styles.css“里
 var ETP = require("extract-text-webpack-plugin");

 module: {
 loaders: [
 ExtractTextPlugin的extract方法有两个参数，第一个参数是经过编译后通过style-loader单独提取出文件来，而第二个参数就是用来编译代码的loader。
  {test: /\.css$/, loader:ETP.extract("style-loader","css-loader") }
  ]
},
 plugins: [
 new ExtractTextPlugin("style.css", {allChunks: true}) // 所有独立样式打包成一个css文件.
 new ExtractTextPlugin("styles.css") //Extract to styles.css file
 ]
 }
 注意：如果你只是想把css使用style标签内联到html里，你不必使用extract-text-webpack-plugin，仅仅使用css loader和style loader即可：

 module: {
 loaders: [{
  test: /\.css$/,
  loader: 'style!css' // (short for style-loader!css-loader)
 }]
加载器（loader）和插件
你可能已经意识到了，Loader处理单独的文件级别并且通常作用于包生成之前或生成的过程中。

而插件则是处理包（bundle）或者chunk级别，且通常是bundle生成的最后阶段。一些插件如commonschunkplugin甚至更直接修改bundle的生成方式。

处理文件的扩展名
很多Webpack的配置文件都有一个resolve属性，然后就像下面代码所示有一个空字符串的值。空字符串在此是为了resolve一些在import文件时不带文件扩展名的表达式，如require('./myJSFile')或者import myJSFile from './myJSFile'（译者注：实际就是自动添加后缀，默认是当成js文件来查找路径）

{
 resolve: {
   extensions: ['', '.js', '.jsx']
 }
}

 *
 *
 *
 *
 * 3. 常用功能
 3.1 设置入口

 配置那些js需要处理，entry有三种写法，每个入口称为一个chunk。

 字符串：
 entry: "./index/index.js" ：配置模块会被解析为模块，并在启动时加载。chunk名为默认为main， 具体打包文件名视output配置而定。


 数组
 entry: ['./src/mod1.js', [...,] './src/index.js'] ：所有的模块会在启动时 按照配置顺序 加载，合并到最后一个模块会被导出。chunk名默认为main

 对象
 entry: {index: '...', login : [...] }：如果传入Object，则会生成多个入口打包文件， key是chunk名，value可以是字符串，也可是数组。

 例如
 entry: {
    index: './index/index.js',
    login: ['./mod/mod1.js', './index/login.js']
}

 3.2 配置输出目录

 设置入口配置的文件的输出规则，通过output对象实现，常用设置：

 output: {
    path: __dirname + '/build',
    filename: '[name]-[id].js',
    publicPath: '/asstes/'
}
 其中：

 output.path ：指定输出文件路径，通常设置为__dirname + ‘/build’,
 output.filename: 输出文件名称，有下面列出的四种可选的变量。 filename项的配置可以是这几种的任意一种或多种的组合。 如 output.filename = ‘[name]-[id].js’, 则输出就是 index-1.js、 login-2.js。
 [id], chunk的id
 [name] ,chunk名
 [hash], 编译哈希值
 [chunkhash] , chunk的hash值
 output.publicPath：设置为想要的资源访问路径。访问时，则需要通过类似http://localhost:8080/asstes/index-1.js来访问资源，如果没有设置，则默认从站点根目录加载。

 3.3 设置loader
 模块加载和链式模块加载
 模块加载器是可自由添加的Node模块，用于将不同类型的文件“load”或“import”并转换成浏览器可以识别的类型，如js、Stylesheet等。更高级的模块加载器甚至可以支持使用ES6里边的“require”或“import”引入模块。


 loader是webpack中比较重要的部分，她是处理各类资源的执行者。它们是一系列的函数（运行在node.js中），将资源中的代码作为参数，然后返回新的代码。你可以用loader告诉webpack可以加载哪些文件，或者不加载哪些文件。

 Loader的特点

 可以链式执行。它们在一个管道中被提交，只需要保证最后的loader返回JavaScript即可，其他loader可以返回任意方便下一个loader处理的内容。
 可以异步or同步执行
 运行在Node.js中，可以做几乎任何事儿
 可以接收query参数，用于向loader传递参数
 配置中可与正则/扩展结合使用
 可以在npm中发布并使用
 除了main,其他模块可以导出成loader
 可以通过配置调入
 和插件（plugins）配合可获得更多功能
 可生成其他格式文件
 安装loader

 npm install xxx-loader --save

 或者

 npm install xxx-loader --save-dev

 其中，XXX为webpack支持的loader名，常用的有：html、css、jsx、coffee、jade、less、sass、style等。
 你可以通过webpack loader 列表 查看所有支持的loader。当然你可以自己根据需求创建并发布loader。

 配置loader

 modules: {
    loaders: [
        {
            test: /\.js$/, //匹配希望处理文件的路径
            exclude: /node_modules/, // 匹配不希望处理文件的路径
            loaders: 'xxx-loader?a=x&b=y'  //此处xxx-loader 可以简写成xxx , ？后以query方式传递给loader参数
        },
        ...
    ]
}

 多loader调用示例:

 在js中，如果要直接解析某个文件，你可以采用：

 require('jade!./index.jade')

 如果要解析css，并内联之，需要使用到分隔符 !

 require(!style!css!./style.css)

 同理，如果要解析less， 转换成css之后，再内联之，写法如：

 require('!style!css!less!./style.less!') ; // 此语句的含义是，先调用less-loader解析style.less文件，输出结果会被css-loader处理, 然后再被style-loader处理

 同理，在webpack.config.jsp配置文件中，只需要制定处理的loader序列：
 即：
 loaders: [
 {
         test: /\.less$/,
         loader: "style!css!less"
     }
 ]
 ...


 本章会介绍比较常用的loader的配置方法。

 3.3.1 解析并抽取css

 在webpack中css默认方案是，将css编译并通过内联的方式在html页面中插入<style>样式标签。当然这远远不能满足我们的要求，webpack提供css-loader模块用于编译css文件，并且提供了插件extract-text-webpack-plugin将css从js代码中抽出并合并。你可以访问此处,查看文档和例子。
 这样你可以在模块中，尽情使用 require(style.css), webpack会帮你做解析，合并entry中定义js及其依赖中所用到的所有css，然后生成一个指定的css文件。

 配置如下：
var ExtractTextPlugin = require('extract-text-webpack-plugin');

 ...
 module: {
    loaders: [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap"
            )
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }
    ]

},
 plugins: [
 new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
        disable: false,
        allChunks: true
    })
 ]
 ...

 3.3.2 处理图片、字体等文件

 在css中或者js逻辑中，都会涉及到require图片的情况，webpack可以内联图片地址到打包js中并且通过require()返回图片路径。当然，不只是图片，还有css中用到的iconfont，特殊情况用到的flash等，都可以相似处理。这里，我们需要用到url-loader 或 file-loader。

 file-loader: 将匹配到的文件复制到输出文件夹，并根据output.publicPath的设置返回文件路径
 url-loader: 类似file-loader ,但是它可以返回一个DataUrl (base 64)如果文件小于设置的限制值limit。
 同样，这之前，你需要实现配置相关loader。

 安装url-loader 和 file-loader:

 npm install url-loader file-loader --save

 配置：

 module:{
    loaders:[
        {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192' //  <= 8kb的图片base64内联
        },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=image/svg+xml'
            }
    ]
}

 通过向url-loader传递参数，如果图片小于8kb，则base64内联，大于8kb，则通过output.publishPath配置的前缀将图片路径写入代码，并提取图片到输出目录。

 3.3.3 解析JSX

 在React项目中，需要解析JSX和相关JavaScript文件，需要下载loader：

 npm install react-hot-loader jsx-loader --save


 同样，配置loader:

 ...
 loaders: [
 {
     test: /\.js$/,
     exclude: /node_modules/,
     loader: 'react-hot!jsx-loader?harmony'
 }
 ]
 ...

 3.3.4解析VUE

 和React项目类似，如果要解析VUE框架编写的.vue文件，需要下载loader:

 npm install vue-loader --save

 配置loader:

 loaders: [
 {
     test: /\.vue$/,
     loader: 'vue-loader'
 }
 ]

 但需要注意的是，如果你的代码中用到了如jade，less等其他语法，可能需要提前下载相应loader到本地。vue-loader的介绍可以查看： vue-loader

 3.3.5 解析ES6语法

 babel可以让我们在编写代码的时候，使用更高级的ECMAScript6的语法。然后我们编写的JS文件可以被编译成可被低版本浏览器处理的常规代码。

 使用方法
 安装loader:

 npm install babel-loader --save

 配置loader:
 loaders: [
 {
     test: /\.js$/,
     exclude: /node_modules/,
     loader: 'babel'
 }
 ]

 例如:

 const a = 1;

 console.log(a);

 if (true) {
    let a = 3;
    console.log(a);
}

 console.log(a);

 解析为：

 var a = 1;

 console.log(a);

 if (true) {
    var _a = 3;
    console.log(_a);
}

 console.log(a);

 3.4 其他

 ####3.4.1 借助web_modules引用外部库
 有些时候，我们用到的第三方库并没有采用CommonJS或AMD规范，也没有提交到npm。这样的话，我们无法通过npm来下载，并通过require()来引用这些库。
 webpack给我们提供了一个很好的实现方式。我们可以在项目根目录下，创建一个叫做web_modules的文件夹，然后将需要用到的第三方库存放在此处。那么之后，不需要做任何设置，可以在我们的逻辑代码中使用require(
 ‘xx-lib.js’)并且使用了。

 文件组织如下：


 此时，我们就可以在业务逻辑中，大胆地使用web_modules中配置的库了，打包的时候，webpack会自动将web_modules中被用到的库封装。

 **例如： **

 var director = require('director')
 var Router = director.Router();
 ...

 3.4.2 去除多个文件中的频繁依赖

 当我们经常使用React、jQuery等外部第三方库的时候，通常在每个业务逻辑JS中都会遇到这些库。
 如我们需要在各个文件中都是有jQuery的$对象，因此我们需要在每个用到jQuery的JS文件的头部通过require('jquery')来依赖jQuery。 这样做非常繁琐且重复，因此webpack提供了我们一种比较高效的方法，我们可以通过在配置文件中配置使用到的变量名，那么webpack会自动分析，并且在编译时帮我们完成这些依赖的引入。

 webpack.config.js中：

 var webpack = require('webpack');

 ...
 plugins: [
 new webpack.ProvidePlugin({
       'Moment': 'moment',
       "$": "jquery",
       "jQuery": "jquery",
       "window.jQuery": "jquery",
       "React": "react"
   })
 ]
 ...

 这样，我们在JS中，就不需要引入jQuery等常用模块了，直接使用配置的这些变量，webpack就会自动引入配置的库。

 3.4.3 开发环境与发布环境配置

 某些情况，我们需要在页面中输出开发调试内容，但是又不想让这些调试内容在发布的时候泄露出去，那么我们可以采用魔力变量(magic globals)来处理。

 配置文件：

 var webpack = require('webpack');

 var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'true'))
});

 ...

 plugins: [
 definePlugin
 ]
 ...

 业务逻辑代码中写入
 按照下面的代码写入，我们就可以在我们自己设定的环境下进行更具针对性的调试。比如我们希望在开发环境下可以AJAX可以调试本地mock数据，然后在发布的时候，可以正常访问服务端数据。那么通过此种方式可以完全实现。

 if (__DEV__) {
    console.warn('Extra logging');
    //开发环境需要进行的处理
    //...
}

 if (__PRERELEASE__) {
    console.log('prerelease');
    //预发环境需要进行的处理
   //...
}

 设置环境命令

 要告诉webpack我们希望当前是什么环境，只需要在命令中写入 BUILD_DEV=1 webpck 那么webpack通过配置，就会将所有我们引用到的__DEV__变量设置为true。

 我们可以在package.json中事先定义好命令：

 "scripts": {
    "dev": "BUILD_DEV=1 webpack-dev-server --progress --colors",
    "build": "BUILD_PRERELEASE=1 webpack -p"
  }

 那么就可以避免输入冗长的命令了：

 开发时输入：

 npm run dev

 发布时输入:

 npm run build

 3.4.5 合并公共代码

 项目中，对于一些常用的组件，站点公用模块经常需要与其他逻辑分开，然后合并到同一个文件，以便于长时间的缓存。要实现这一功能，配置参照:

  var webpack            = require('webpack');
 var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

 ...
 entry: {
   a: './index/a.js',
   b: './idnex/b.js',
   c: './index/c.js',
   d: './index/d.js'
},
 ...
 plugins: [
 new CommonsChunkPlugin('part1.js', ['a', 'b']),
 new CommonsChunkPlugin('common.js', ['part1', 'c'])
 ]
 ...

 ##4 使用devtool调试

 可以通过在配置中加入devtool项，选择预设调试工具来提高代码调试质量和效率：

 eval – 每个模块采用eval和 //@ sourceURL 来执行
 source-map – sourceMap是发散的，和output.sourceMapFilename协调使用
 hidden-source-map – 和source-map类似，但是不会添加一个打包文件的尾部添加引用注释
 inline-source-map – SourceMap以DataUrl的方式插入打包文件的尾部
 eval-source-map – 每个模块以eval方式执行并且SourceMap以DataUrl的方式添加进eval
 cheap-source-map – 去除column-mappings的SourceMap， 来自于loader中的内容不会被使用。
 cheap-module-source-map – 去除column-mappings的SourceMap, 来自于loader中的SourceMaps被简化为单个mapping文件
 各种模式的对比：

 devtool	构建速度	再次构建速度	支持发布版	质量
 eval	+++	+++	no	生成代码
 cheap-eval-source-map	+	++	no	转换代码(lines only)
 cheap-source-map	+	o	yes	转换代码(lines only)
 cheap-module-eval-source-map	o	++	no	源代码 (lines only)
 cheap-module-source-map	o	–	yes	源代码(lines only)
 eval-source-map	—	+	no	源代码
 source-map	—	—	yes	源代码

//异步加载脚本

CommonJs: require.ensure
require.ensure(dependencies, callback)
The require.ensure method ensures that every dependency in dependencies can be synchronously required when calling the callback. callback has no parameter.

Example:

require.ensure(["module-a", "module-b"], function() {
  var a = require("module-a");
  // ...
});
Note: require.ensure only loads the modules, it doesn’t evaluate them.

AMD: require
The AMD spec defines an asynchronous require method with this definition:

require(dependencies, callback)
When called, all dependencies are loaded and the callback is called with the exports of the loaded dependencies.

Example:

require(["module-a", "module-b"], function(a, b) {
  // ...
});
Note: AMD require loads and evaluate the modules. In webpack modules are evaluated left to right.


 5. 一个常用的配置
 为了方便大家摘取，和补全文章中用于示例的代码片段，特将配置文件整理如下，作参考：

 配置文件:
 */

var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');


//自定义"魔力"变量
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});


module.exports = {
    //上下文
    context: __dirname + '/src',
    //配置入口
    entry: {
        a: './view/index/index.js',
        b: './view/index/b.js',
        vender: ['./view/index/c.js', './view/index/d.js']
    },
    //配置输出
    output: {
        path: __dirname + '/build/',
        filename: '[name].js?[hash]',
        publicPath: '/assets/',
        sourceMapFilename: '[file].map'
    },
    devtool: '#source-map',
    //模块
    module: {
        loaders: [
            {
                //处理javascript
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?sourceMap"
                )
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader!less-loader"
                )
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=1024'
            }, {
                //处理vue
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=image/svg+xml'
            }
        ]

    },
    plugins: [
        //公用模块
        new CommonsChunkPlugin('common.js', ['a', 'b']),
        //设置抽出css文件名
        new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
            disable: false,
            allChunks: true
        }),
        //定义全局变量
        definePlugin,
        //设置此处，则在JS中不用类似require('./base')引入基础模块， 只要直接使用Base变量即可
        //此处通常可用做，对常用组件，库的提前设置
        new webpack.ProvidePlugin({
            Moment: 'moment', //直接从node_modules中获取
            Base: '../../base/index.js' //从文件中获取
        })
    ],
    //添加了此项，则表明从外部引入，内部不会打包合并进去
    externals: {
        jquery: 'window.jQuery',
        react: 'window.React',
        //...
    }
};