const express = require('express');
const app = express();
const server = require('http').Server(app);

server.listen(53304);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
