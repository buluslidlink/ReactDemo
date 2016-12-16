//require(`webpack-dev-server/bin/webpack-dev-server.js`);

var path = require(`path`);
var express = require(`express`);
var webpack = require(`webpack`);
var config = require(`./webpack.config`);
var compiler = webpack(config);
var app = express();

var webpackDevOptions = {
    publicPath: config.output.publicPath
};

app.use(`/svr`, function (req, res) {
    res.send(`success`);
});
//app.use(express.static(path.resolve(__dirname,`js`)));
app.use(require(`webpack-dev-middleware`)(compiler, webpackDevOptions));
app.use(require(`webpack-hot-middleware`)(compiler));

app.use(`/test`, function (req, res) {
    res.sendFile(path.join(__dirname, `index.html`));
});

app.listen(8787, `0.0.0.0`, function (err) {
    if (err) {
        console.log(err);
    }
});

console.log(process.env.NODE_ENV);