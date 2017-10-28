import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import socket from 'socket.io';
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
app.locals.appTitle = 'Learn Chat';

/*
  Middleware & Routing setting
*/
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

appHttpServer.listen(port, () => {
  console.log('Express is listening on port: ', port);
});

/*
  Use this when testing React Components with Jest & Enzyme or other test tools
*/
// export default app;
