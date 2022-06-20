const express = require('express');
const app = express();
const axios  = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 8888

const serverURLs = {
  '1': 'http://44.203.171.122:8024',
  '2': 'http://44.202.58.18:8024'
}
let currentServer = '1';

const serverSwitch = function(req, res, next) {
  if (currentServer === '1') {
    currentServer = '2';
  } else {
    currentServer = '1';
  }
  next()
}

app.use(serverSwitch)
app.use('/reviews', createProxyMiddleware({ target: serverURLs[currentServer], changeOrigin: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})