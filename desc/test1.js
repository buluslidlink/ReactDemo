/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/15
 * Summary     : 
 *
 * *************************************************************/
import funcA, {obj} from './test';
funcA(); //相当于调用module.exports.default属性。
alert(JSON.stringify(obj)); //obj为module.exports.obj属性。

var ff = {
    "_plugins": {"compilation": [null, null]},
    "outputPath": "",
    "outputFileSystem": null,
    "inputFileSystem": null,
    "recordsInputPath": null,
    "recordsOutputPath": null,
    "records": {},
    "fileTimestamps": {},
    "contextTimestamps": {},
    "resolvers": {
        "normal": {"_plugins": {}, "fileSystem": null},
        "loader": {"_plugins": {}, "fileSystem": null},
        "context": {"_plugins": {}, "fileSystem": null}
    },
    "parser": {
        "_plugins": {
            "evaluate Literal": [null],
            "evaluate LogicalExpression": [null],
            "evaluate BinaryExpression": [null],
            "evaluate UnaryExpression": [null],
            "evaluate typeof undefined": [null],
            "evaluate Identifier": [null],
            "evaluate MemberExpression": [null],
            "evaluate CallExpression": [null],
            "evaluate CallExpression .replace": [null],
            "evaluate CallExpression .substr": [null],
            "evaluate CallExpression .substring": [null],
            "evaluate CallExpression .split": [null],
            "evaluate ConditionalExpression": [null],
            "evaluate ArrayExpression": [null]
        }
    },
    "options": {
        "entry": ["./js/react-redux/app.js"],
        "output": {
            "path": "build",
            "publicPath": "/build",
            "filename": "bundle.js",
            "libraryTarget": "var",
            "sourceMapFilename": "[file].map[query]",
            "hotUpdateChunkFilename": "[id].[hash].hot-update.js",
            "hotUpdateMainFilename": "[hash].hot-update.json",
            "crossOriginLoading": false,
            "hashFunction": "md5",
            "hashDigest": "hex",
            "hashDigestLength": 20,
            "sourcePrefix": "\t",
            "devtoolLineToLine": false
        },
        "resolve": {
            "extensions": ["", ".js", "jsx"],
            "fastUnsafe": [],
            "alias": {},
            "packageAlias": "browser",
            "modulesDirectories": ["web_modules", "node_modules"],
            "packageMains": ["webpack", "browser", "web", "browserify", ["jam", "main"], "main"]
        },
        "module": {
            "loaders": [{"test": {}, "include": ["E:\\KoaAndReact\\js"], "loaders": ["babel"]}, {
                "test": {},
                "include": ["E:\\KoaAndReact\\css"],
                "loader": "E:\\KoaAndReact\\node_modules\\.1.0.1@extract-text-webpack-plugin\\loader.js?{\"0\":\"l\",\"1\":\"e\",\"2\":\"s\",\"3\":\"s\",\"omit\":1,\"extract\":true,\"remove\":true}!style!css"
            }],
            "unknownContextRequest": ".",
            "unknownContextRecursive": true,
            "unknownContextRegExp": {},
            "unknownContextCritical": true,
            "exprContextRequest": ".",
            "exprContextRegExp": {},
            "exprContextRecursive": true,
            "exprContextCritical": true,
            "wrappedContextRegExp": {},
            "wrappedContextRecursive": true,
            "wrappedContextCritical": false
        },
        "plugins": [{}, {}, {}, {"definitions": {"__DEV__": false, "__PRERELEASE__": true}}],
        "debug": false,
        "devtool": false,
        "cache": true,
        "context": "E:\\KoaAndReact",
        "target": "web",
        "node": {
            "console": false,
            "process": true,
            "global": true,
            "setImmediate": true,
            "__filename": "mock",
            "__dirname": "mock"
        },
        "resolveLoader": {
            "fastUnsafe": [],
            "alias": {},
            "modulesDirectories": ["web_loaders", "web_modules", "node_loaders", "node_modules"],
            "packageMains": ["webpackLoader", "webLoader", "loader", "main"],
            "extensions": ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
            "moduleTemplates": ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
        },
        "optimize": {"occurenceOrderPreferEntry": true}
    },
    "context": "E:\\KoaAndReact"
}