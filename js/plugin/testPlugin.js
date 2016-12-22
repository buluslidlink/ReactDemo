/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/22
 * Summary     : 
 *
 * *************************************************************/
function FileListPlugin(options) {
}
FileListPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        // console.log('compilation', compilation);
        // Create a header string for the generated file:

        // Loop through all compiled assets,
        // adding a new line item for each filename.
        for (var filename in compilation.assets) {
            //    filelist += ('- ' + filename + '\n');
        }

        //  filelist += JSON.stringify(compilation);

        // Insert this list into the Webpack build as a new file asset:
        compilation.assets['filelist.md'] = {
            source: function () {
                return "########";
            },
            size: function () {
                return filelist.length;
            }
        };

        callback();
    });
};

module.exports = FileListPlugin;
