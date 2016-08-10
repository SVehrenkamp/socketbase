import fs from 'fs';
import http from 'http';
import url from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import {Server as WebSocketServer} from 'ws';
import browserSync from 'browser-sync';
import webpackWatch from './middleware/webpack-watch';
//Routes
import sockets from './middleware/sockets'

//create server
const PORT = process.env.PORT || 3100;
const server = http.createServer();
const wss = new WebSocketServer({server: server, path: '/socket'});
const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/client', express.static(__dirname + '/public/client.html'));

//include websocket handler
sockets(wss);

//start browser-sync
let livereload =  () => {
  if (process.env.ENV === "dev") {
    webpackWatch();
    browserSync({
      proxy: 'localhost:' + PORT,
      files: ['public/**/*.{js,css}',  'public/*.html'],
      open: false
    });
  }
  console.log('listening on Port %d', PORT)
}

//start server
server.on('request', app);
server.listen(PORT, livereload);
