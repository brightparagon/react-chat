import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import socket from 'socket.io';
// import webpack from 'webpack';
// import webpackDevServer from 'webpack-dev-server';
import path from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import routes from './routes';

/*
  Basic server config setting
*/
const app = express();
const appHttpServer = http.Server(app);
const io = new socket(appHttpServer, {path: '/api/chat'});
const port = process.env.PORT || 3000;
// const devPort = 8080;
app.locals.appTitle = 'Learn Chat';
// const allowCORS = function(req, res, next) { // 이 부분은 app.use(router) 전에 추가하도록 하자
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   (req.method === 'OPTIONS') ?
//     res.send(200) :
//     next();
// };

/*
  Middleware & Routing setting
*/
// app.use(allowCORS);
app.use(cors());
app.use(morgan('development'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use('/', express.static(path.join(__dirname, './../')));
app.use('/api', routes);
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../index.html'));
});

io.on('connection', (socket) => {
  socket.on('signin', (data)=> {
    console.log('user sign-in: ', data);
    io.emit('welcome', data.name);
  });

  socket.on('message', (data) => {
    console.log('message from: ', data);
    const dataToSend = {
      email: data.email,
      name: data.name,
      message: data.message
    };
    io.emit('broadcast', dataToSend);
  });

  socket.on('signout', (data) => {
    console.log('user sign-out:', data);
    io.emit('signout', data.name);
  });
});

/*
  Development Mode: Webpack Dev Server with Hot Module Replacement on
*/
// if (process.env.NODE_ENV === 'development') {
//   const config = require('../webpack.dev.config');
//   const compiler = webpack(config);
//   const devServer = new webpackDevServer(compiler, config.devServer);
//   console.log(config);
//   devServer.listen(devPort, (err) => {
//     if (err) {
//       return console.error(err);
//     }
//
//     console.log('webpack-dev-server is listening on port: ', devPort);
//   });
// }

appHttpServer.listen(port, () => {
  console.log('Express is listening on port: ', port);
});
// app.listen(port, () => {
//   console.log('Express is listening on port: ', port);
// });

/*
  Use this when testing React Components with Jest & Enzyme or other test tools
*/
// export default app;
