import express from 'express';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import routes from './routes';

/*
  Basic server config setting
*/
const app = express();
const port = process.env.PORT || 3000;
const devPort = 8000;
app.locals.appTitle = '';

/*
  Middleware & Routing setting
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/*
  Development Mode: Webpack Dev Server with Hot Module Replacement on
*/
if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new webpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
    console.log('webpack-dev-server is listening on port: ', devPort);
  });
}

app.listen(port, () => {
  console.log('Express is listening on port: ', port);
});

/*
  Use this when testing React Components with Jest & Enzyme or other test tools
*/
// export default app;
