import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config, { ROOT_PATH } from './webpack.config.js';
import ip from 'ip';
import fs from 'fs';


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/*(.json|.do)', function(req, res) {
    //  兼容.do , .json 等接口
    var ma = req.url.match(/(.*)\/(.*)(.json|.do)/);
    var realPath;
    if (ma && ma[2]) {
      realPath = path.join(ROOT_PATH, 'mock/' + ma[2] + '.json');
    }
    console.log(realPath);

    fs.exists(realPath, function (status) {
      if (status) {
        var file = require(realPath);
        res.send(file)
      }
      else {
        res.send('找不到此文件');
      }
      res.end();
    });
    // res.writeHead(200, {'Content-Type': 'text/html'});

  });

  app.get('/', function response(req, res) {
    //if no favicon
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'images/x-icon'});
      res.end();
      return;
    }

    res.write(middleware.fileSystem.readFileSync(path.join(ROOT_PATH, 'build/index.html')));
    res.end();
  });


} else {
  app.use(express.static(ROOT_PATH + '/build'));
  app.get('*', function response(req, res) {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'images/x-icon'});
      res.end();
      return;
    }
    res.sendFile(path.join(ROOT_PATH, 'build/index.html'));
  });
}

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  var c = require('child_process');
  var link = 'http://' + ip.address() + ':3000';
  c.exec('open ' + link);
  console.info('==> 🌎 Listening on  ' + (ip.address() + ':3000').blue);
});
