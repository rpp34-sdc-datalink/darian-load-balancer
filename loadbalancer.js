const express = require('express');
const app = express();
const axios  = require('axios');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 8888

const serverURLs = {
  '1': 'http://44.203.171.122:8024',
  '2': 'http://44.202.58.18:8024'
}
let currentServer = '2';
let serverReqCount = 0;

const serverSwitch = function(req, res, next) {
  serverReqCount++;
  if (serverReqCount >= 100) {
    serverReqCount = 0;
    if (currentServer === '1') {
      currentServer = '2';
    } else {
      currentServer = '1';
    }
  }
  next()
}
let serverURL = serverURLs[currentServer];

app.get('/loaderio-2e0bc4c775d5023276a39b3cf12bf9d6.txt', (req, res) => {
  res.sendFile(path.join(__dirname,'/loaderio-2e0bc4c775d5023276a39b3cf12bf9d6.txt'));
})
app.use(serverSwitch)
app.use('/reviews', createProxyMiddleware({ target: serverURL, changeOrigin: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})